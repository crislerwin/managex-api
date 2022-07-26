import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprises.entity';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(Enterprise)
    private enterpriseRepository: Repository<Enterprise>,
  ) {}

  create(createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseRepository.save(
      this.enterpriseRepository.create(createEnterpriseDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.enterpriseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(enterpriseId: string): Promise<Enterprise> {
    return this.enterpriseRepository.findOne({
      where: {
        id: enterpriseId,
      },
    });
  }

  update(id: string, updateEnterprise: UpdateEnterpriseDto) {
    return this.enterpriseRepository.save(
      this.enterpriseRepository.create({
        id,
        ...updateEnterprise,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.enterpriseRepository.softDelete(id);
  }
}
