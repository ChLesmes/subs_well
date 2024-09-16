import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientService } from '../interfaces/IClientService';
import { ClientRepository, CLIENT_REPOSITORY } from '../../domain/repositories/client.repository';
import { Client } from 'src/domain/entities/client.entity';
import { CreateClientDto } from '../../adapters/web/dtos/client/create-client.dto';
import { AccountService } from './account.service';
import { UpdateClientDto } from 'src/adapters/web/dtos/client/update-client.dto';
import { UpdateClientSubscriptionDto } from 'src/adapters/web/dtos/client/update-client-subscription.dto';
import { ResponseClientDto } from 'src/adapters/web/dtos/client/response-client.dto';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { SUBSCRIPTION_REPOSITORY, SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { AddonService } from './addon.service';

@Injectable()
export class ClientService implements IClientService {

  constructor(
    @Inject(CLIENT_REPOSITORY) 
    private readonly clientRepository: ClientRepository,
    private readonly accountService: AccountService, 
    private readonly addonService: AddonService, 
    @Inject(SUBSCRIPTION_REPOSITORY) 
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async getAll(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  async getById(id: string): Promise<Client> {
    return await this.clientRepository.findById(id);
  }

  async create(clientData: CreateClientDto): Promise<Client> {
      const account = await this.accountService.getById(clientData.accountId);      
      if (!account) throw new NotFoundException('Account not found');
      const client = new Client({...clientData});      
      return await this.clientRepository.create(client);
  }

  async update(id: string, clientData: UpdateClientDto): Promise<Client> {
    let client = await this.clientRepository.findById(id);
    if (clientData.accountId) {
      const account = await this.accountService.getById(clientData.accountId);
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      client.accountId = account._id.toString();
    }
    client = await this.clientRepository.update(id, clientData);
    return client;
  }

  async softDelete(id: string): Promise<void> {
    await this.clientRepository.softDelete(id);
  }

  async changeSubscription(id: string, subscriptionData: UpdateClientSubscriptionDto): Promise<Client> {
    await this.addonService.getById(subscriptionData.addonId);
    let client: any = await this.clientRepository.findById(id);
    const subscription = client.subscriptionIds.find((s: Subscription) => s.addonId === subscriptionData.addonId);

    if(!!subscription) {
      await this.subscriptionRepository.update(subscription._id, {...subscriptionData});
      client = await this.clientRepository.findById(id);
    } else {
      const subscription = new Subscription({...subscriptionData});
      const subscriptionDb = await this.subscriptionRepository.create(subscription);
      client = await this.clientRepository.addSubscription(id, subscriptionDb._id);
    }
    return client;
  }
}
