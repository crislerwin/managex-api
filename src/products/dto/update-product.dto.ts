import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  amount: number | null;

  @ApiProperty({ example: 'Beer' })
  @IsNotEmpty()
  category: string | null;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  price: number | null;
}
