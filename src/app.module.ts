import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './util/middleware/current-user.middleware';
import { PositionsModule } from './positions/positions.module';
import { InformationsModule } from './informations/informations.module';
import { MedicinesModule } from './medicines/medicines.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ExaminationScheduleModule } from './examination_schedule/examination_schedule.module';
import { ExformModule } from './exform/exform.module';
import { ServicesModule } from './services/services.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';



@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, PositionsModule, InformationsModule, MedicinesModule, SuppliersModule, ExaminationScheduleModule, ExformModule, ServicesModule, PaymentsModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(CurrentUserMiddleware)
    .forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
