import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { PaymentEntity } from 'src/payments/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, PaymentEntity]), PaymentsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports:[ReportsService]
})
export class ReportsModule {}
