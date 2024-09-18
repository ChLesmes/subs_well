import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientController } from './controllers/client.controller';
import { ClientService } from '../../application/services/client.service';
import { ClientRepositoryImpl } from '../../infrastructure/repositories/client.repository.impl';
import { Client, ClientSchema } from '../../infrastructure/db/schema/client.schema';
import { CLIENT_REPOSITORY, ClientRepository } from '../../domain/repositories/client.repository';
import { AccountModule } from './account.module';
import { SubscriptionModule } from './subscription.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
    AccountModule,
    SubscriptionModule,
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepositoryImpl,
    },
  ],
  exports: [ClientService],
})
export class ClientModule {}
