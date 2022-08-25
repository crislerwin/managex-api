import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
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

  create(createProductDto: CreateProductDto, enterpriseId: string) {
    return this.productRepository.save(
      this.productRepository.create({
        ...createProductDto,
        enterpriseId,
      }),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
    enterpriseId: string,
  ) {
    return this.productRepository.find({
      where: {
        enterpriseId,
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(enterpriseId: string, fields: EntityCondition<Product>) {
    return this.productRepository.findOne({
      where: {
        enterpriseId,
        ...fields,
      },
    });
  }

  update(enterpriseId: string, id: string, updateProduct: UpdateProductDto) {
    return this.productRepository.save(
      this.productRepository.create({
        enterpriseId,
        id,
        ...updateProduct,
      }),
    );
  }

  async softDelete(enterpriseId: string, id: string): Promise<void> {
    await this.productRepository.softDelete({
      enterpriseId,
      id,
    });
  }
}
