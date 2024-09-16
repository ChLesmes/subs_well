import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from '../../../application/services/account.service';
import { CreateAccountDto } from '../dtos/account/create-account.dto';
import { UpdateAccountDto } from '../dtos/account/update-account.dto';
import { ResponseAccountDto } from '../dtos/account/response-account.dto';
import { handleExceptions } from 'src/common/helpers/handleExceptions';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const account = await this.accountService.create(createAccountDto);
      return new ResponseAccountDto(account);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get()
  async getAll() {
    try {
      const accounts = await this.accountService.getAll();
      return accounts.map(account => new ResponseAccountDto(account));
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const account = await this.accountService.getById(id);
      return new ResponseAccountDto(account);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id')
  async updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const updatedAccount = await this.accountService.update(id, updateAccountDto);
      return new ResponseAccountDto(updatedAccount);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.accountService.softDelete(id);
      return { message: 'Account deleted successfully' };
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }
}
