import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from '../account.module';
import { ClientModule } from '../client.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ConfigModule, 
    AccountModule, 
    ClientModule, 
  ],
})
export class SeedModule {}
