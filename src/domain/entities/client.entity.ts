import { IClient } from '../interfaces/client.interface';

export class Client {
  public readonly _id?: string; 
  public name: String;
  public email: string;
  public accountId?: string;
  public subscriptionIds?: string[];
  public deleted: boolean;

  constructor({_id, name, email, accountId, subscriptionIds, deleted = false}: IClient) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.accountId = accountId;
    this.subscriptionIds = subscriptionIds;
    this.deleted = deleted;
  }

  markAsDeleted() {
    this.deleted = true;
  }
}
