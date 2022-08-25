import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Products')
@Controller({
  version: '1',
})
export class ProductController {
  constructor(private readonly productServices: ProductService) {}

  @Post('product/:enterpriseId')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProductDto: CreateProductDto,
    @Param('enterpriseId') enterpriseId: string,
  ) {
    return this.productServices.create(createProductDto, enterpriseId);
  }

  @Get('products/:enterpriseId')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Param('enterpriseId') enterpriseId: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productServices.findManyWithPagination(
        {
          page,
          limit,
        },
        enterpriseId,
      ),
      { page, limit },
    );
  }

  @Get('product/:enterpriseId/:productId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('enterpriseId') enterpriseId: string,
    @Param('productId') productId: string,
  ) {
    return this.productServices.findOne(enterpriseId, { id: productId });
  }

  @Patch('product/:enterpriseId/:productId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('enterpriseId') enterpriseId: string,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productServices.update(
      enterpriseId,
      productId,
      updateProductDto,
    );
  }

  @Delete('product/:enterpriseId/:productId')
  remove(@Param('enterpriseId') enterpriseId: string, @Param('id') id: string) {
    return this.productServices.softDelete(enterpriseId, id);
  }
}
