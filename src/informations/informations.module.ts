import { Module } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { InformationsController } from './informations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationEntity } from './entities/information.entity';
import { PositionsModule } from 'src/positions/positions.module';

@Module({
  imports: [TypeOrmModule.forFeature([InformationEntity]), PositionsModule],
  controllers: [InformationsController],
  providers: [InformationsService],
  exports: [InformationsService],
})
export class InformationsModule {}
