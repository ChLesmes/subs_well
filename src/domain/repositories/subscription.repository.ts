import { Subscription } from '../entities/subscription.entity';

export interface SubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  findAll(): Promise<Subscription[]>;
  save(subscription: Subscription): Promise<void>;
}