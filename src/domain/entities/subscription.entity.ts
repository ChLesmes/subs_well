import { ISubscription } from "../interfaces/subscription.interface";

export class Subscription {
  public _id?: string;
  public type?: string;
  public state: string;
  public totalAmount?: number;
  public amountSpent?: number;
  public addonId?: string;
  public deleted: boolean;

  constructor(
    {_id, type, state, totalAmount, amountSpent, addonId, deleted = false}: ISubscription
  ) {
    this._id = _id;
    this.type = type;
    this.state = state;
    this.totalAmount = totalAmount;
    this.amountSpent = amountSpent;
    this.addonId = addonId;
    this.deleted = deleted;
  }

  markAsDeleted() {
    this.deleted = true;
  }
}
