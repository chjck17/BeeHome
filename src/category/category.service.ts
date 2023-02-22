import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const product = await this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(product);
    return product;
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['product'] });
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (product) {
      return product;
    }

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    const updatedProduct = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (updatedProduct) {
      return updatedProduct;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deleteResponse = await this.categoryRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    } else {
      return 'Deleted';
    }
  }
}
