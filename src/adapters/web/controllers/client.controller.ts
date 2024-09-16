import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from '../../../application/services/client.service';
import { CreateClientDto } from '../dtos/client/create-client.dto';
import { handleExceptions } from 'src/common/helpers/handleExceptions';
import { ResponseClientDto } from '../dtos/client/response-client.dto';
import { UpdateClientDto } from '../dtos/client/update-client.dto';
import { UpdateClientSubscriptionDto } from '../dtos/client/update-client-subscription.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientService.create(createClientDto);
      return new ResponseClientDto(client);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get()
  async getAll() {
    try {
      const clients = await this.clientService.getAll();
      return clients.map(client => new ResponseClientDto(client));
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const client = await this.clientService.getById(id);
      return new ResponseClientDto(client);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      const updatedClient = await this.clientService.update(id, updateClientDto);
      return new ResponseClientDto(updatedClient);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.clientService.softDelete(id);
      return { message: 'Client deleted successfully' };
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id/subscription')
  async enableSubscription(
    @Param('id') id: string,
    @Body() subscriptionData: UpdateClientSubscriptionDto
  ) {
    try {
      const account = await this.clientService.changeSubscription(id, subscriptionData);
      return new ResponseClientDto(account);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }
}
