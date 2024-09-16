import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Subscription } from '../../domain/entities/subscription.entity';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>) {}

  async findById(id: string): Promise<Subscription | null> {
    const subscription = await this.subscriptionModel
      .findOne({_id: id, deleted: { $ne: true }})
      .populate('addonId', 'name')
      .exec();
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel
      .find({deleted: { $ne: true }})
      .populate('addonId', 'name')
      .exec();
  }

  async create(subscription: Subscription): Promise<Subscription> {
    return await this.subscriptionModel.create(subscription);
  }

  async update(id: string, subscriptionData: Partial<Subscription>): Promise<Subscription> {
    const updatedSubscription = await this.subscriptionModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, subscriptionData, { new: true }).exec();
    if (!updatedSubscription) {
      throw new NotFoundException('Subscription not found');
    }
    return updatedSubscription;
  }

  async softDelete(id: string): Promise<void> {
    const deleteSubscription = await this.subscriptionModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, { deleted: true }).exec();
    if (!deleteSubscription) {
      throw new NotFoundException('Subscription not found');
    }
  }
}