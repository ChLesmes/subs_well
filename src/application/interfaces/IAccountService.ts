import { CreateAccountDto } from '../../adapters/web/dtos/account/create-account.dto';
import { Account } from '../../domain/entities/account.entity';
import { UpdateAccountDto } from '../../adapters/web/dtos/account/update-account.dto';
import { UpdateAccountSubscriptionDto } from '../../adapters/web/dtos/account/update-account-subscription.dto';

export interface IAccountService {
  getAll(): Promise<Account[]>;
  getById(id: string): Promise<Account>;
  create(createAccountDto: CreateAccountDto): Promise<Account>;
  update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
  softDelete(id: string): Promise<void>;
  changeSubscription(id: string, subscriptionData: UpdateAccountSubscriptionDto): Promise<Account>;
}