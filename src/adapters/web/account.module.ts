import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountController } from './controllers/account.controller';
import { AccountService } from '../../application/services/account.service';
import { AccountRepositoryImpl } from '../../infrastructure/repositories/account.repository.impl';
import { Account, AccountSchema } from 'src/infrastructure/db/schema/account.schema';
import { ACCOUNT_REPOSITORY } from 'src/domain/repositories/account.repository';
import { SubscriptionModule } from './subscription.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
    SubscriptionModule
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountRepositoryImpl,
    },
  ],
  exports: [AccountService],
})
export class AccountModule {}