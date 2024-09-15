import { Account } from '../../domain/entities/account.entity';

export interface IAccountService {
  getAccountDetails(id: string): Promise<Account>;
  registerAccount(accountData: any): Promise<Account>;
}