import { Subscription } from '../entities/subscription.entity';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export interface SubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  findAll(): Promise<Subscription[]>;
  create(subscription: Subscription): Promise<Subscription>;
  update(id: string, subscriptionData: Partial<Subscription>): Promise<Subscription>;
  softDelete(id: string): Promise<void>;
}