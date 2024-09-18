import { CreateClientDto } from '../../adapters/web/dtos/client/create-client.dto';
import { Client } from '../../domain/entities/client.entity';
import { UpdateClientDto } from '../../adapters/web/dtos/client/update-client.dto';
import { UpdateClientSubscriptionDto } from '../../adapters/web/dtos/client/update-client-subscription.dto';

export interface IClientService {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client>;
  create(createClientDto: CreateClientDto): Promise<Client>;
  update(id: string, updateClientDto: UpdateClientDto): Promise<Client>;
  softDelete(id: string): Promise<void>;
  changeSubscription(id: string, subscriptionData: UpdateClientSubscriptionDto): Promise<Client>;
}