import { Client } from '../../domain/entities/client.entity';

export interface IClientService {
  getClientDetails(id: string): Promise<Client>;
  registerClient(clientData: any): Promise<Client>;
}