import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Subscription } from '../../domain/entities/subscription.entity';

export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private subscriptions: Subscription[] = [];

  async findById(id: string): Promise<Subscription | null> {
    return this.subscriptions.find(subscription => subscription.id === id) || null;
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptions;
  }

  async save(subscription: Subscription): Promise<void> {
    this.subscriptions.push(subscription);
  }
}