import { NestFactory } from '@nestjs/core';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './presentation/app.module';
import { RpcCustomExceptionFilter } from './domain';

async function bootstrap() {

  const logger = new Logger('Main Gateway Client');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter())
  await app.listen(envs.port);
  
  logger.log(`Gateway running on port: ${envs.port}`);
}
bootstrap();
