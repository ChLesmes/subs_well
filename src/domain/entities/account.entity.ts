import { IAccount } from '../interfaces/account.interface';

export class Account {
  public readonly _id?: string; 
  public name: string;
  public subscriptionId?: string;
  public deleted: boolean;

  constructor({_id, name, subscriptionId, deleted = false}: IAccount) {
    this._id = _id;
    this.name = name;
    this.subscriptionId = subscriptionId;
    this.deleted = deleted;
  }

  markAsDeleted() {
    this.deleted = true;
  }
}
