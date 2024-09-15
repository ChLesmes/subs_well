import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { Client } from '../../domain/entities/client.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async findById(id: string): Promise<Client | null> {
    return this.clientModel.findById(id).exec();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async create(client: Client): Promise<Client> {
    const newClient = new this.clientModel(client);
    return newClient.save();
  }

  async update(id: string, client: Client): Promise<Client> {
    return this.clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.clientModel.findByIdAndDelete(id).exec();
  }
}