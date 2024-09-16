
export interface IClient {
  _id?: string;
  name: string;
  email: string;
  accountId?: string;
  subscriptionIds?: string[];
  deleted?: boolean;
}
