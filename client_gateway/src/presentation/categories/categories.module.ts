import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
