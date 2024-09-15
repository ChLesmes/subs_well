import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/IAccountService';
import { AccountRepository, ACCOUNT_REPOSITORY } from '../../domain/repositories/account.repository';
import { Account } from 'src/domain/entities/account.entity';
import { CreateAccountDto } from '../../adapters/web/dtos/account/create-account.dto';

@Injectable()
export class AccountService implements IAccountService {

  constructor(
    @Inject(ACCOUNT_REPOSITORY) 
    private readonly accountRepository: AccountRepository,
  ) {}

  async getAccountDetails(id: string): Promise<Account> {
    return this.accountRepository.findById(id);
  }

  async registerAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account({...createAccountDto});
    await this.accountRepository.create(account);
    return account;
  }
}
