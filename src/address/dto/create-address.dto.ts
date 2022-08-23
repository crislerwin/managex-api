import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Rua dos Bobos' })
  @IsNotEmpty()
  address: string | null;

  @ApiProperty({ example: 'Quadra 12321321' })
  @IsNotEmpty()
  complement: string | null;

  @ApiProperty({ example: 'Cidade dos Bobos' })
  @IsNotEmpty()
  city: string | null;

  @ApiProperty({ example: 'Bobolandia' })
  @IsNotEmpty()
  uf: string | null;

  @ApiProperty({ example: '12321321' })
  @IsNotEmpty()
  zipCode: string | null;
}
