import { Account } from "../entities/account.entity";
import { Subscription } from "../entities/subscription.entity";

export interface IClient {
  id?: string;
  name: string;
  email: string;
  account?: Account;
  subscriptions?: Subscription[];
  deleted?: boolean;
}