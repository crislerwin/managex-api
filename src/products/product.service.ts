import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { Enterprise } from '../enterprises/entities/enterprises.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private enterpriseRepository: Repository<Enterprise>,
  ) {}

  create(createProductDto: CreateProductDto, enterpriseId: number) {
    return this.productRepository.save(
      this.productRepository.create({
        ...createProductDto,
        enterpriseId,
      }),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.productRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Product>) {
    return this.productRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateProduct: UpdateProductDto) {
    return this.productRepository.save(
      this.productRepository.create({
        id,
        ...updateProduct,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }
}
