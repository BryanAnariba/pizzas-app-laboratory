import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { ClientModuleNames } from 'src/enums';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ClientModuleNames.NATS_SERVICES,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: ClientModuleNames.NATS_SERVICES,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
})
export class NatsModule {}
