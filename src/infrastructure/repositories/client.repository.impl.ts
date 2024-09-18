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
      .findOne({ _id: id, deleted: { $ne: true } })
      .populate({
        path: 'accountId',
        match: { deleted: { $ne: true } },
        populate: {
          path: 'subscriptionId',
        },
      })
      .populate('subscriptionIds')
      .lean()
      .exec();

    if (!client) {
      throw new NotFoundException('Client not found');
    }
    if (!client.accountId) {
      throw new NotFoundException('Client Account not found');
    }
    return client;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientModel
      .find({ deleted: { $ne: true } })
      .populate({
        path: 'accountId',
        match: { deleted: { $ne: true } },
        populate: {
          path: 'subscriptionId',
        },
      })
      .populate('subscriptionIds')
      .lean()
      .exec();

    return clients.filter((client) => client.accountId !== null);
  }

  async create(client: Client): Promise<Client> {
    const createdClient = await this.clientModel.create(client);
    return await this.clientModel
      .findOne({ _id: createdClient._id })
      .populate({
        path: 'accountId',
        populate: {
          path: 'subscriptionId',
        },
      })
      .exec();
  }

  async update(id: string, clientData: Partial<Client>): Promise<Client> {
    const updatedClient = await this.clientModel
      .findOneAndUpdate({ _id: id, deleted: { $ne: true } }, clientData, {
        new: true,
      })
      .populate({
        path: 'accountId',
        populate: {
          path: 'subscriptionId',
        },
      })
      .populate('subscriptionIds')
      .exec();
    if (!updatedClient) {
      throw new NotFoundException('Client not found');
    }
    return updatedClient;
  }

  async softDelete(id: string): Promise<void> {
    const deleteClient = await this.clientModel
      .findOneAndUpdate({ _id: id, deleted: { $ne: true } }, { deleted: true })
      .exec();
    if (!deleteClient) {
      throw new NotFoundException('Client not found');
    }
  }

  async addSubscription(id: string, subscriptionId: string): Promise<Client> {
    const updatedClient = await this.clientModel
      .findOneAndUpdate(
        { _id: id, deleted: { $ne: true } },
        { $addToSet: { subscriptionIds: subscriptionId } },
        { new: true },
      )
      .populate({
        path: 'accountId',
        populate: {
          path: 'subscriptionId',
        },
      })
      .populate('subscriptionIds')
      .exec();
    if (!updatedClient) {
      throw new NotFoundException('Client not found');
    }
    return updatedClient;
  }
}
