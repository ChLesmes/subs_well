import { Account } from "../entities/account.entity";
import { Subscription } from "../entities/subscription.entity";

export interface IAccount {
  id?: string;
  name: string;
  type: string;
  subscriptions?: Subscription;
  deleted?: boolean;
}