import { IAccount } from '../interfaces/account.interface';
import { Subscription } from './subscription.entity';

export class Account {
  public readonly id?: string; 
  public name: string;
  public type: string;
  public subscriptions?: Subscription;
  public deleted: boolean;

  constructor({id, name, type, subscriptions, deleted = false}: IAccount) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.subscriptions = subscriptions;
    this.deleted = deleted;
  }
}
