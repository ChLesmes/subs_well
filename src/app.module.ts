import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JoiValidationSchema } from './config/joi.validation';
import { envConfiguration } from './config/configuration';
import { AccountModule } from './adapters/web/account.module';
import { ClientModule } from './adapters/web/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: JoiValidationSchema
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: process.env.DB_NAME,
    }),
    AccountModule, 
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
