import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { Address } from '../../address/entities/address.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateEnterpriseDto {
  @ApiProperty()
  enterpriseName: string | null;

  @ApiProperty({ example: '12321321' })
  socialReason: string | null;

  @ApiProperty({ example: 'John Doe' })
  sponsorName: string | null;

  @ApiProperty({ example: 10 })
  employees: number | null;

  @ApiProperty({ type: () => Address })
  @IsOptional()
  @Validate(IsExist, ['Address', 'id'], {
    message: 'addressNotExists',
  })
  address: Address | null;
}
