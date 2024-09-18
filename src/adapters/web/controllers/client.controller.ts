import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ClientService } from '../../../application/services/client.service';
import { CreateClientDto } from '../dtos/client/create-client.dto';
import { handleExceptions } from '../../../common/helpers/handleExceptions';
import { ResponseClientDto } from '../dtos/client/response-client.dto';
import { UpdateClientDto } from '../dtos/client/update-client.dto';
import { UpdateClientSubscriptionDto } from '../dtos/client/update-client-subscription.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED, 
    description: 'Client was created if the account has an active subscription',
    type: ResponseClientDto,
  })
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientService.create(createClientDto);
      return new ResponseClientDto(client);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Clients with their account and subscriptions was returned (subscriptions will only be returned if the account has an active subscription)',
    type: [ResponseClientDto],
  })
  async getAll() {
    try {
      const clients = await this.clientService.getAll();
      return clients.map(client => new ResponseClientDto(client));
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Client with their account and subscriptions was returned (subscriptions will only be returned if the account has an active subscription)',
    type: ResponseClientDto,
  })
  async getById(@Param('id') id: string) {
    try {
      const client = await this.clientService.getById(id);
      return new ResponseClientDto(client);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Client was updated',
    type: ResponseClientDto,
  })
  async updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      const updatedClient = await this.clientService.update(id, updateClientDto);
      return new ResponseClientDto(updatedClient);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Client was deleted',
    type: String,
  })
  async delete(@Param('id') id: string) {
    try {
      await this.clientService.softDelete(id);
      return { message: 'Client deleted successfully' };
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id/subscription')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'The client subscription was created or updated only if the client account has an active subscription and the account is not deleted',
    type: ResponseClientDto,
  })
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
