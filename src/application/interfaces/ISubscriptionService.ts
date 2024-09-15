import { Subscription } from '../../domain/entities/subscription.entity';

export interface ISubscriptionService {
  getSubscriptionDetails(id: string): Promise<Subscription>;
  registerSubscription(subscriptionData: any): Promise<Subscription>;
}