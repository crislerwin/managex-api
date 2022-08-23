import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty()
  @IsOptional()
  address: string | null;

  @ApiProperty()
  @IsOptional()
  complement: string | null;

  @ApiProperty()
  @IsOptional()
  city: string | null;

  @ApiProperty()
  @IsOptional()
  uf: string | null;

  @ApiProperty()
  @IsOptional()
  zipCode: string | null;
}
