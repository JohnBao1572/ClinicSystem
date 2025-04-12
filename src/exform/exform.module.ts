import { Module } from '@nestjs/common';
import { ExformService } from './exform.service';
import { ExformController } from './exform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExformEntity } from './entities/exform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExformEntity])],
  controllers: [ExformController],
  providers: [ExformService],
  exports:[ExformService]
})
export class ExformModule {}
