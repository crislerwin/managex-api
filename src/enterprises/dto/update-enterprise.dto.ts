import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { Address } from '../../address/entities/address.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { CreateEnterpriseDto } from './create-enterprise.dto';

export class UpdateEnterpriseDto extends PartialType(CreateEnterpriseDto) {
  @ApiProperty()
  @IsOptional()
  enterpriseName: string | null;

  @ApiProperty({ example: '12321321' })
  @IsOptional()
  socialReason: string | null;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  sponsorName: string | null;

  @ApiProperty({ example: 10 })
  @IsOptional()
  employees: number | null;

  @ApiProperty({ type: () => Address })
  @IsOptional()
  @Validate(IsExist, ['Address', 'id'], {
    message: 'addressNotExists',
  })
  address: Address | null;
}
