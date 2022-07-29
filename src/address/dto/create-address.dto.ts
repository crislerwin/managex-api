import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 'Rua dos Bobos' })
  address: string | null;

  @ApiProperty({ example: 'Quadra 12321321' })
  complement: string | null;

  @ApiProperty({ example: 'Cidade dos Bobos' })
  city: string | null;

  @ApiProperty({ example: 'Bobolandia' })
  uf: string | null;

  @ApiProperty({ example: '12321321' })
  zipCode: string | null;
}
