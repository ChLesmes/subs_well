import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from '../../application/services/subscription.service';
import { SubscriptionRepositoryImpl } from '../../infrastructure/repositories/subscription.repository.impl';
import { Subscription, SubscriptionSchema } from 'src/infrastructure/db/schema/subscription.schema';
import { Addon, AddonSchema } from 'src/infrastructure/db/schema/addon.schema';

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
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    {
      provide: 'SubscriptionRepository',
      useClass: SubscriptionRepositoryImpl,
    },
  ],
})
export class SubscriptionModule {}
