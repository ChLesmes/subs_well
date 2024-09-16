import { Account } from './account.entity';
import { Subscription } from './subscription.entity';
import { Addon } from './addon.entity';
import { IClient } from '../interfaces/client.interface';

export class Client {
  public readonly id?: string; 
  public name: String;
  public email: string;
  public account?: Account;
  public subscriptions?: Subscription[];
  public deleted: boolean;

  constructor({id, name, email, account, subscriptions, deleted = false}: IClient) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.account = account;
    this.subscriptions = subscriptions;
    this.deleted = deleted;
  }

  markAsDeleted() {
    this.deleted = true;
  }
}
