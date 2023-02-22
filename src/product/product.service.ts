import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  findAll() {
    return this.productRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (product) {
      return product;
    }

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({
      where: { id: id },
    });
    if (updatedProduct) {
      return updatedProduct;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deleteResponse = await this.productRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    } else {
      return 'Deleted';
    }
  }
}
