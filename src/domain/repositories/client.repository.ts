import { Client } from '../entities/client.entity';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  findById(id: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  create(client: Client): Promise<Client>;
  update(id: string, client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
}