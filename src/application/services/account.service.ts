import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/IAccountService';
import { AccountRepository, ACCOUNT_REPOSITORY } from '../../domain/repositories/account.repository';
import { Account } from 'src/domain/entities/account.entity';
import { CreateAccountDto } from '../../adapters/web/dtos/account/create-account.dto';
import { UpdateAccountDto } from 'src/adapters/web/dtos/account/update-account.dto';

@Injectable()
export class AccountService implements IAccountService {

  constructor(
    @Inject(ACCOUNT_REPOSITORY) 
    private readonly accountRepository: AccountRepository,
  ) {}

  async getAll(): Promise<Account[]> {
    return await this.accountRepository.findAll();
  }

  async getById(id: string): Promise<Account> {
    return await this.accountRepository.findById(id);
  }

  async create(accountData: CreateAccountDto): Promise<Account> {
    const account = new Account({...accountData});
    return await this.accountRepository.create(account);
  }

  async update(id: string, accountData: UpdateAccountDto): Promise<Account> {
    const updatedAccount = await this.accountRepository.update(id, accountData);
    return updatedAccount;
  }

  async softDelete(id: string): Promise<void> {
    await this.accountRepository.softDelete(id);
  }
}
