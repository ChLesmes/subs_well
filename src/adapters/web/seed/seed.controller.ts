import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigService } from '@nestjs/config';

@Controller('seed')
export class SeedController {
  private seedSecret: string;
  constructor(
    private readonly seedService: SeedService,
    private readonly configService: ConfigService,
  ) {
      this.seedSecret = this.configService.get<string>('seedSecret');
  }

  @Get(':seedSecret')
  excuteSeed(@Param('seedSecret') seedSecret: string) {
    if (this.seedSecret !== seedSecret) throw new NotFoundException();
    return this.seedService.executeSeed(seedSecret);
  }
}
