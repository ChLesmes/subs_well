import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientService } from '../interfaces/IClientService';
import { ClientRepository, CLIENT_REPOSITORY } from '../../domain/repositories/client.repository';
import { Client } from '../../domain/entities/client.entity';
import { CreateClientDto } from '../../adapters/web/dtos/client/create-client.dto';
import { AccountService } from './account.service';
import { UpdateClientDto } from '../../adapters/web/dtos/client/update-client.dto';
import { UpdateClientSubscriptionDto } from '../../adapters/web/dtos/client/update-client-subscription.dto';
import { Subscription } from '../../domain/entities/subscription.entity';
import { SUBSCRIPTION_REPOSITORY, SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { AddonService } from './addon.service';
import { States } from '../../domain/enums/states';

interface Account {
  subscriptionId?: {state: States};
}

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
    const clients = await this.clientRepository.findAll();
    // Verificar si las cuentas no están eliminadas y tiene una suscripción activa
    return clients.filter(client => {

      const accountId = client.accountId as unknown as Account;

      if (accountId && accountId.subscriptionId && accountId.subscriptionId.state === States.Active) {
        client.subscriptionIds = client.subscriptionIds || [];
      } else {
        client.subscriptionIds = undefined;
      }

      return true;
    });
  }

  async getById(id: string): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    // Asegurarse de que accountId sea tratado como Account
    const accountId = client.accountId as unknown as Account;

    // Verificar si la cuenta no está eliminada y tiene una suscripción activa
    if (accountId && accountId.subscriptionId && accountId.subscriptionId.state === States.Active) {
      client.subscriptionIds = client.subscriptionIds || [];
    } else {
      client.subscriptionIds = undefined;
    }
    
    return client;
  }

  async create(clientData: CreateClientDto): Promise<Client> {
      const account = (await this.accountService.getById(clientData.accountId))as unknown as Account;
      if (!account) throw new NotFoundException('Account not found');
      if (!account.subscriptionId || account.subscriptionId.state !== States.Active) {
        throw new BadRequestException('PermissionError: The client does not have an active account subscription');
      }
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
    const accountId = client.accountId as unknown as Account;
    if (!accountId || accountId.subscriptionId?.state !== States.Active) {
      throw new BadRequestException('PermissionError: The client does not have an active account subscription');
    }
    
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
