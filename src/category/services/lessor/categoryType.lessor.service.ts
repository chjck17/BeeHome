import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { NotFoundExc } from '../../../common/exceptions/custom.exception';
import { CategoryTypeRepository } from '../../repositories/category-type.repository';

import { CategoryType } from '../../entities/category-type.entity';
import {
  UpdateCategoryTypeDetailReqDto,
  UpdateCategoryTypeReqDto,
} from '../../dtos/lessor/req/category-type.lessor.req.dto';
import { CategoryTypeDetailRepository } from '../../repositories/category-type-detail.repository';
import { CategoryDetailRepository } from '../../repositories/category-detail.repository';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryTypeDetail } from '../../entities/category-type-detail.entity';
import { In } from 'typeorm';

@Injectable()
export class CategoryTypeLessorService {
  constructor(
    private categoryTypeRepo: CategoryTypeRepository,
    private categoryRepo: CategoryRepository,
    private categoryDetailRepo: CategoryDetailRepository,

    private categoryTypeDetailRepo: CategoryTypeDetailRepository,
  ) {}

  // @Transactional()
  // async createCategoryType(
  //   createCategoryTypeReqDto: CreateCategoryTypeLessorReqDto,
  // ) {
  //   const categoryType = this.categoryTypeRepo.create(createCategoryTypeReqDto);
  //   await this.categoryTypeRepo.save(categoryType);
  //   return CategoryTypeResDto.forLessor(categoryType);
  // }

  // @Transactional()
  // async createMultiCategoryType(
  //   createCategoryTypeReqDtos: CreateCategoryTypeLessorReqDto[],
  //   categoryId: number,
  // ) {
  //   const categoryTypes = createCategoryTypeReqDtos.map(
  //     (createCategoryTypeReqDto) => {
  //       return this.categoryTypeRepo.create({
  //         ...createCategoryTypeReqDto,
  //         categoryId,
  //       });
  //     },
  //   );
  //   await this.categoryTypeRepo.save(categoryTypes);

  //   return categoryTypes.map((categoryType) => {
  //     return CategoryTypeResDto.forLessor(categoryType);
  //   });
  // }

  @Transactional()
  async createOrUpdateCategoryType(
    createOrUpdateCategoryTypeDto: UpdateCategoryTypeReqDto[],
    categoryId: number,
  ) {
    const updateCategoryTypes = createOrUpdateCategoryTypeDto.map(
      (categoryType) => {
        if (!categoryType.id)
          return this.categoryTypeRepo.create({
            ...categoryType,
            categoryId,
          });
        return categoryType;
      },
    );

    const updatedCategoryTypes = await this.categoryTypeRepo.save(
      updateCategoryTypes,
    );

    // return updatedCategoryTypes.map((categoryType) =>
    //   CategoryTypeResDto.forLessor(categoryType),
    // );
  }

  async delete(id: number) {
    const { affected } = await this.categoryTypeRepo.softDelete(id);

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async saveItemType(
    itemId: number,
    itemDetails: CategoryType[],
    itemDetailsDto: UpdateCategoryTypeReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: UpdateCategoryTypeReqDto[] = [];
    const itemDetailsToUpdate: Partial<UpdateCategoryTypeReqDto>[] = [];

    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          categoryTypeDetails: dto.categoryTypeDetails,
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
      itemDetailsToUpdate.map(async (item) =>
        // this.categoryTypeRepo.update(item.id, item),
        this.saveItemTypeDetails(item.id, [], item.categoryTypeDetails),
      ),
      itemDetailIdsToRemove.length &&
        this.deleteMulti(itemDetailIdsToRemove, itemId),
    ]);

    if (itemDetailsToInsert.length) {
      // await this.categoryTypeRepo.insert(itemDetailsToInsert);

      itemDetailsToInsert.map(async (item) =>
        // this.categoryTypeRepo.update(item.id, item),
        this.saveItemTypeDetails(item.id, [], item.categoryTypeDetails),
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
          lang: itemDetail.lang,
          name: itemDetail.name,
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
  }
  async deleteMulti(ids: number[], categoryId: number) {
    await this.categoryTypeDetailRepo
      .createQueryBuilder()
      .softDelete()
      .from(CategoryTypeDetail)
      .andWhere({ categoryId: In(ids) })
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
