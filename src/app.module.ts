import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './util/middleware/current-user.middleware';
import { PositionsModule } from './positions/positions.module';
import { InformationsModule } from './informations/informations.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, PositionsModule, InformationsModule],
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
