import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Enterprise } from '../../enterprises/entities/enterprises.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class AuthProductsDto {
  @ApiProperty({ type: () => Enterprise })
  @IsNotEmpty()
  @Validate(IsExist, ['Enterprise', 'id'], {
    message: 'addressNotExists',
  })
  enterpriseId: Enterprise['id'] | null;

  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  amount: number | null;

  @ApiProperty({ example: 'Beer' })
  @IsNotEmpty()
  category: string | null;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  isOffer: boolean | null;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  price: number | null;
}
