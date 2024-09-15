import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionService } from '../../../application/services/subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  getHello(): string {
    return this.subscriptionService.getHello();
  }

  @Get(':id')
  async getSubscription(@Param('id') id: string) {
    return this.subscriptionService.getSubscriptionDetails(id);
  }
}
