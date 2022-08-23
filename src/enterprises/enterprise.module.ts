import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise])],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  exports: [EnterprisesService],
})
export class EnterprisesModule {}
