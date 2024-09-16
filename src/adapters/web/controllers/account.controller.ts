import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AccountService } from '../../../application/services/account.service';
import { CreateAccountDto } from '../dtos/account/create-account.dto';
import { UpdateAccountDto } from '../dtos/account/update-account.dto';
import { ResponseAccountDto } from '../dtos/account/response-account.dto';
import { handleExceptions } from 'src/common/helpers/handleExceptions';
import { UpdateAccountSubscriptionDto } from '../dtos/account/update-account-subscription.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED, 
    description: 'Accounts was created',
    type: ResponseAccountDto,
  })
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const account = await this.accountService.create(createAccountDto);
      return new ResponseAccountDto(account);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Accounts was returned',
    type: [ResponseAccountDto],
  })
  async getAll() {
    try {
      const accounts = await this.accountService.getAll();
      return accounts.map(account => new ResponseAccountDto(account));
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Account was returned',
    type: ResponseAccountDto,
  })
  async getById(@Param('id') id: string) {
    try {
      const account = await this.accountService.getById(id);
      return new ResponseAccountDto(account);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Account was updated',
    type: ResponseAccountDto,
  })
  async updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const updatedAccount = await this.accountService.update(id, updateAccountDto);
      return new ResponseAccountDto(updatedAccount);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Account was deleted',
    type: String,
  })
  async delete(@Param('id') id: string) {
    try {
      await this.accountService.softDelete(id);
      return { message: 'Account deleted successfully' };
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id/subscription')
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Account Subscription was updated or created',
    type: ResponseAccountDto,
  })
  async enableSubscription(
    @Param('id') id: string,
    @Body() subscriptionData: UpdateAccountSubscriptionDto
  ) {
    try {
      const account = await this.accountService.changeSubscription(id, subscriptionData);
      return new ResponseAccountDto(account);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }
}
