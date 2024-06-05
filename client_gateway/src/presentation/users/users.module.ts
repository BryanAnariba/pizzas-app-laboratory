import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientModuleNames } from 'src/enums';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ClientModuleNames.USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.product_ms_host,
          port: envs.product_ms_port,
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
