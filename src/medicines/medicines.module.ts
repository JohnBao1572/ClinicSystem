import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineEntity } from './entities/medicine.entity';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineEntity]), SuppliersModule],
  controllers: [MedicinesController],
  providers: [MedicinesService],
  exports: [MedicinesService],
})
export class MedicinesModule {}
