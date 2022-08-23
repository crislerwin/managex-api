import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressService: Repository<Address>,
  ) {}

  create(createEnterpriseDto: CreateAddressDto) {
    return this.addressService.save(
      this.addressService.create(createEnterpriseDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.addressService.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Address>) {
    return this.addressService.findOne({
      where: fields,
    });
  }

  update(id: number, updateProfileDto: UpdateAddressDto) {
    return this.addressService.save(
      this.addressService.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.addressService.softDelete(id);
  }
}
