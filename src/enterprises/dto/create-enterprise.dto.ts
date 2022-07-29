import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Address } from '../../address/entities/address.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateEnterpriseDto {
  @ApiProperty()
  @IsNotEmpty()
  enterpriseName: string | null;

  @ApiProperty({ example: '12321321' })
  @IsNotEmpty()
  socialReason: string | null;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  sponsorName: string | null;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  employees: number | null;

  @ApiProperty({ type: () => Address })
  @IsOptional()
  @Validate(IsExist, ['Address', 'id'], {
    message: 'addressNotExists',
  })
  address: Address | null;
}
