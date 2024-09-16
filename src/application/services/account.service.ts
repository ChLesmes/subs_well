import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/IAccountService';
import { AccountRepository, ACCOUNT_REPOSITORY } from '../../domain/repositories/account.repository';
import { Account } from 'src/domain/entities/account.entity';
import { CreateAccountDto } from '../../adapters/web/dtos/account/create-account.dto';
import { UpdateAccountDto } from 'src/adapters/web/dtos/account/update-account.dto';
import { SUBSCRIPTION_REPOSITORY, SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { States } from 'src/domain/enums/states';
import { UpdateAccountSubscriptionDto } from 'src/adapters/web/dtos/account/update-account-subscription.dto';
import { Subscription } from 'src/domain/entities/subscription.entity';

@Injectable()
export class AccountService implements IAccountService {

  constructor(
    @Inject(ACCOUNT_REPOSITORY) 
    private readonly accountRepository: AccountRepository,
    @Inject(SUBSCRIPTION_REPOSITORY) 
    private readonly subscriptionRepository: SubscriptionRepository,
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

  async changeSubscription(id: string, subscriptionData: UpdateAccountSubscriptionDto): Promise<Account> {
    let account = await this.accountRepository.findById(id);
    if(account.subscriptionId) {
      await this.subscriptionRepository.update(account.subscriptionId, {...subscriptionData});
    } else {
      const subscription = new Subscription({...subscriptionData});
      const subscriptionDb = await this.subscriptionRepository.create(subscription);
      account = await this.accountRepository.update(id, {subscriptionId: subscriptionDb._id});
    }
    return account;
  }

}
