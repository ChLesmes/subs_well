import { Subscription } from "../entities/subscription.entity";

export interface IAccount {
  _id?: string;
  name: string;
  subscriptionId?: string;
  deleted?: boolean;
}