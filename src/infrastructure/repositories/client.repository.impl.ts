import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { Client } from '../../domain/entities/client.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async findById(id: string): Promise<Client | null> {
    const client = await this.clientModel
      .findOne({_id: id, deleted: { $ne: true }})
      .populate('accountId', 'name')
      .populate('subscriptionIds')
      .exec();
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    
    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel
      .find({deleted: { $ne: true }})
      .populate('accountId', 'name')
      .populate('subscriptionIds')
      .exec();
  }

  async create(client: Client): Promise<Client> {
    return await this.clientModel.create(client);
  }

  async update(id: string, clientData: Partial<Client>): Promise<Client> {
    const updatedClient = await this.clientModel.findOneAndUpdate(
      {_id: id, deleted: { $ne: true }}, clientData, { new: true }
    ).populate('accountId', 'name').populate('subscriptionIds').exec();
    if (!updatedClient) {
      throw new NotFoundException('Client not found');
    }
    return updatedClient;
  }

  async softDelete(id: string): Promise<void> {
    const deleteClient = await this.clientModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, { deleted: true }).exec();
    if (!deleteClient) {
      throw new NotFoundException('Client not found');
    }
  }

  async addSubscription(id: string, subscriptionId: string): Promise<Client> {
    const updatedClient = await this.clientModel.findOneAndUpdate(
      {_id: id, deleted: { $ne: true }}, 
      { $addToSet: { subscriptionIds: subscriptionId } }, 
      { new: true }
    ).exec();
    if (!updatedClient) {
      throw new NotFoundException('Client not found');
    }
    return updatedClient;
  }
}