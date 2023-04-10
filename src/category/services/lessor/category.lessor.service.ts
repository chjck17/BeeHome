import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../../auth/entities/user.entity';
import {
  BadRequestExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
// import { CategoryResDto } from '../../dtos/common/res/category.res.dto';
import { Category } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { LessorRepository } from '../../../auth/repositories/lessor.repository';
import { CategoryTypeLessorService } from './categoryType.lessor.service';

import {
  CategoryDetailReqDto,
  CreateCategoryReqDto,
  DeleteCategoriesReqDto,
  UpdateCategoryDetailReqDto,
  UpdateCategoryReqDto,
} from '../../dtos/lessor/req/category.lessor.req.dto';
import { CategoryDetail } from '../../entities/category-detail.entity';
import { CategoryDetailRepository } from '../../repositories/category-detail.repository';
import { promises } from 'dns';
import {
  CreateCategoryTypeReqDto,
  UpdateCategoryTypeDetailReqDto,
  UpdateCategoryTypeReqDto,
} from '../../dtos/lessor/req/category-type.lessor.req.dto';
import { CategoryTypeRepository } from '../../repositories/category-type.repository';
import { CategoryTypeDetailRepository } from '../../repositories/category-type-detail.repository';
import { GetListCategoryReqDto } from '../../dtos/lessor/req/category.lessor.req.dto';
import { CategoryTypeDetail } from '../../entities/category-type-detail.entity';
import { CategoryType } from '../../entities/category-type.entity';
import { In } from 'typeorm';
import { Language } from '../../../common/enums/lang.enum';

@Injectable()
export class CategoryLessorService {
  constructor(
    private categoryRepo: CategoryRepository,
    private categoryDetailRepo: CategoryDetailRepository,
    private categoryTypeRepo: CategoryTypeRepository,
    private categoryTypeDetailRepo: CategoryTypeDetailRepository,
  ) {}

  @Transactional()
  async create(user: User, dto: CreateCategoryReqDto) {
    const { categoryTypes, categoryDetails } = dto;

    //create Category
    const category = this.categoryRepo.create({
      userId: user.id,
    });

    const createdCategory = await this.categoryRepo.save(category);

    await Promise.all([
      categoryDetails.map(async (item) => {
        const categoryDetail = this.categoryDetailRepo.create({
          categoryId: createdCategory.id,
          lang: item.lang,
          name: item.name,
        });
        await this.categoryDetailRepo.save(categoryDetail);
      }),
    ]);
    await this.saveCategoryType(createdCategory.id, categoryTypes);
  }

  private async saveCategoryType(
    categoryId: number,
    categoryTypes: CreateCategoryTypeReqDto[],
  ) {
    await Promise.all([
      categoryTypes.map(async (ct) => {
        const categoryType = await this.categoryTypeRepo.save({
          categoryId: categoryId,
        });
        ct.categoryTypeDetails.map(
          async (item) =>
            await this.categoryTypeDetailRepo.save({
              categoryTypeId: categoryType.id,
              lang: item.lang,
              name: item.name,
            }),
        );
      }),
    ]);
  }

  async getOne(user: User, id: number) {
    const category = await this.categoryRepo.findOneOrThrowNotFoundExc({
      where: { id: id, userId: user.id },
      relations: {
        categoryTypes: { categoryTypeDetails: true },
        categoryDetails: true,
      },
    });

    return category;
  }

  async getListCategory(user: User, dto: GetListCategoryReqDto) {
    const { limit, page } = dto;

    const queryBuilder = this.categoryRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryDetails', 'categoryDetails')
      .leftJoinAndSelect('category.categoryTypes', 'categoryType')
      .leftJoinAndSelect(
        'categoryType.categoryTypeDetails',
        'categoryTypeDetail',
      )
      .andWhere('category.userId = :id', {
        id: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
      cacheQueries: true,
    });
    return new Pagination(items, meta);
  }

  @Transactional()
  async update(user: User, updateCategoryDto: UpdateCategoryReqDto) {
    const { id } = updateCategoryDto;

    const existedCategory = await this.categoryRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
      relations: {
        categoryTypes: { categoryTypeDetails: true },
        categoryDetails: true,
      },
    });
    await this.saveItemType(
      id,
      existedCategory.categoryTypes,
      updateCategoryDto.categoryTypes,
    );

    await this.saveItemDetails(
      id,
      existedCategory.categoryDetails,
      updateCategoryDto.categoryDetails,
    );
  }

  private async saveItemType(
    itemId: number,
    itemDetails: CategoryType[],
    itemDetailsDto: UpdateCategoryTypeReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: CategoryType[] = [];
    const itemDetailsToUpdate: {
      id: number;
      categoryType: CategoryType;
      categoryTypeDto: UpdateCategoryTypeReqDto;
    }[] = [];
    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          categoryType: itemDetail,
          categoryTypeDto: dto,
        });
      } else {
        itemDetailIdsToRemove.push(itemDetail.id);
      }
    }

    for (const dto of itemDetailsDto) {
      if (!dto.id) {
        itemDetailsToInsert.push(
          this.categoryTypeRepo.create({
            categoryId: itemId,
            categoryTypeDetails: dto.categoryTypeDetails,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.length &&
        itemDetailsToUpdate.map(async (item) =>
          // this.categoryTypeRepo.update(item.id, item),
          this.saveItemTypeDetails(
            item.id,
            item.categoryType.categoryTypeDetails,
            item.categoryTypeDto.categoryTypeDetails,
          ),
        ),
      itemDetailIdsToRemove.length &&
        this.deleteMulti(itemDetailIdsToRemove, itemId),
    ]);

    if (itemDetailsToInsert.length) {
      // await this.categoryTypeRepo.insert(itemDetailsToInsert);

      await Promise.all(
        itemDetailsToInsert.map(async (itemDto) => {
          const categoryType = await this.categoryTypeRepo.save({
            categoryId: itemId,
          });
          const categoryTypeDetail = this.saveItemTypeDetails(
            categoryType.id,
            [],
            itemDto.categoryTypeDetails,
          );
          return categoryTypeDetail;
        }),
      );
    }
  }

  private async saveItemTypeDetails(
    itemId: number,
    itemDetails: CategoryTypeDetail[],
    itemDetailsDto: UpdateCategoryTypeDetailReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: CategoryTypeDetail[] = [];
    const itemDetailsToUpdate: Partial<CategoryTypeDetail>[] = [];

    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          lang: dto.lang,
          name: dto.name,
        });
      } else {
        itemDetailIdsToRemove.push(itemDetail.id);
      }
    }

    for (const dto of itemDetailsDto) {
      if (!dto.id) {
        itemDetailsToInsert.push(
          this.categoryTypeDetailRepo.create({
            categoryTypeId: itemId,
            lang: dto.lang,
            name: dto.name,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.map(async (item) =>
        this.categoryTypeDetailRepo.update(item.id, item),
      ),
      itemDetailIdsToRemove.length &&
        this.categoryTypeDetailRepo.softDelete(itemDetailIdsToRemove),
    ]);

    if (itemDetailsToInsert.length) {
      await this.categoryTypeDetailRepo.insert(itemDetailsToInsert);
    }
    // return { itemDetailIdsToRemove, itemDetailsToInsert, itemDetailsToUpdate };
  }

  private async saveItemDetails(
    itemId: number,
    itemDetails: CategoryDetail[],
    itemDetailsDto: UpdateCategoryDetailReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: CategoryDetail[] = [];
    const itemDetailsToUpdate: Partial<CategoryDetail>[] = [];

    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          lang: dto.lang,
          name: dto.name,
        });
      } else {
        itemDetailIdsToRemove.push(itemDetail.id);
      }
    }

    for (const dto of itemDetailsDto) {
      if (!dto.id) {
        itemDetailsToInsert.push(
          this.categoryDetailRepo.create({
            categoryId: itemId,
            lang: dto.lang,
            name: dto.name,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.map(async (item) =>
        this.categoryDetailRepo.update(item.id, item),
      ),
      itemDetailIdsToRemove.length &&
        this.categoryDetailRepo.softDelete(itemDetailIdsToRemove),
    ]);

    if (itemDetailsToInsert.length) {
      await this.categoryDetailRepo.insert(itemDetailsToInsert);
    }
  }

  async deleteCategory(user: User, id: number) {
    const { affected } = await this.categoryRepo
      .createQueryBuilder()
      .softDelete()
      .from(Category)
      .where({ id })
      .andWhere({ userId: user.id })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  async deleteCategories(
    user: User,
    deleteCategoriesLessorReqDto: DeleteCategoriesReqDto,
  ) {
    const { ids } = deleteCategoriesLessorReqDto;

    const { affected } = await this.categoryRepo
      .createQueryBuilder()
      .softDelete()
      .from(Category)
      .whereInIds(ids)
      .andWhere({ userId: user.id })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async delete(id: number) {
    const { affected } = await this.categoryTypeRepo.softDelete(id);

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async deleteMulti(ids: number[], categoryId: number) {
    await this.categoryTypeDetailRepo
      .createQueryBuilder()
      .softDelete()
      .from(CategoryTypeDetail)
      .andWhere({ categoryTypeId: In(ids) })
      .execute();

    const { affected } = await this.categoryTypeRepo
      .createQueryBuilder()
      .softDelete()
      .from(CategoryType)
      .whereInIds(ids)
      .andWhere({ categoryId })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }
}
