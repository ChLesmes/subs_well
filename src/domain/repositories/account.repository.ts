import { Account } from '../entities/account.entity';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  create(account: Account): Promise<Account>;
  update(id: string, account: Account): Promise<Account>;
  delete(id: string): Promise<void>;
}