import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../../../application/services/account.service';
import { CreateAccountDto } from '../dtos/account/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  registerAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.registerAccount(createAccountDto);
  }

  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return this.accountService.getAccountDetails(id);
  }
}
