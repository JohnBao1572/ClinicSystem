import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { ExformModule } from 'src/exform/exform.module';
import { ExformEntity } from 'src/exform/entities/exform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity,ExformEntity]), ExformModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
