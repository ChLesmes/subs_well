import { Client } from '../entities/client.entity';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  findById(id: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  create(client: Client): Promise<Client>;
  update(id: string, clientData: Partial<Client>): Promise<Client>;
  softDelete(id: string): Promise<void>;
  addSubscription(id: string, subscriptionId: string): Promise<Client>;
}