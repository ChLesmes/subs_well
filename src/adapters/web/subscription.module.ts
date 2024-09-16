import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionRepositoryImpl } from '../../infrastructure/repositories/subscription.repository.impl';
import { Subscription, SubscriptionSchema } from 'src/infrastructure/db/schema/subscription.schema';
import { Addon, AddonSchema } from 'src/infrastructure/db/schema/addon.schema';
import { AddonController } from './controllers/addon.controller';
import { AddonService } from 'src/application/services/addon.service';
import { SUBSCRIPTION_REPOSITORY } from 'src/domain/repositories/subscription.repository';
import { ADDON_REPOSITORY } from 'src/domain/repositories/addon.repository';
import { AddonRepositoryImpl } from 'src/infrastructure/repositories/addon.repository.impl';
import { AccountModule } from './account.module';
import { ClientModule } from './client.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
      {
        name: Addon.name,
        schema: AddonSchema,
      },
    ]),
  ],
  controllers: [
    AddonController
  ],
  providers: [
    AddonService,
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: SubscriptionRepositoryImpl,
    },
    {
      provide: ADDON_REPOSITORY,
      useClass: AddonRepositoryImpl,
    },
  ],
  exports: [SUBSCRIPTION_REPOSITORY, AddonService],
})
export class SubscriptionModule {}
