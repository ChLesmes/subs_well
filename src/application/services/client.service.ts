import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IClientService } from '../interfaces/IClientService';
import { ClientRepository, CLIENT_REPOSITORY } from '../../domain/repositories/client.repository';
import { Client } from 'src/domain/entities/client.entity';
import { CreateClientDto } from '../../adapters/web/dtos/client/create-client.dto';
import { AccountService } from './account.service';
import { handleExceptions } from 'src/common/helpers/handleExceptions';

@Injectable()
export class ClientService implements IClientService {

  constructor(
    @Inject(CLIENT_REPOSITORY) 
    private readonly clientRepository: ClientRepository,
    private readonly accountService: AccountService, 
  ) {}

  async getClientDetails(id: string): Promise<Client> {
    return this.clientRepository.findById(id);
  }

  async registerClient(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const account = await this.accountService.getById(createClientDto.account.toString());      
      if (!account) throw new BadRequestException('Account does not exists');
      const client = new Client({name: createClientDto.name, email: createClientDto.email});
      return await this.clientRepository.create(client);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }
}
