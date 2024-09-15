import { Injectable } from '@nestjs/common';
import { ISubscriptionService } from '../interfaces/ISubscriptionService';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Subscription } from 'src/domain/entities/subscription.entity';

@Injectable()
export class SubscriptionService implements ISubscriptionService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async getSubscriptionDetails(id: string): Promise<Subscription> {
    return this.subscriptionRepository.findById(id);
  }

  async registerSubscription(subscriptionData: any): Promise<Subscription> {
    const subscription = new Subscription(subscriptionData.id, subscriptionData.state);
    await this.subscriptionRepository.save(subscription);
    return subscription;
  }
}
