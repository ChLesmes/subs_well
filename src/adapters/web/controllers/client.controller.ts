import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from '../../../application/services/client.service';
import { CreateClientDto } from '../dtos/client/create-client.dto';
import { handleExceptions } from 'src/common/helpers/handleExceptions';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  registerClient(@Body() createClientDto: CreateClientDto) {
      return this.clientService.registerClient(createClientDto);
  }

  @Get(':id')
  async getClient(@Param('id') id: string) {
    return this.clientService.getClientDetails(id);
  }
}
