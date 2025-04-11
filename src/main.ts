import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dataSource from 'db/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await dataSource.initialize();
    console.log('Database connection successfu');
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
