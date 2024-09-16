
export interface ISubscription {
  _id?: string;
  type?: string;
  state: string;
  totalAmount?: number;
  amountSpent?: number;
  addonId?: string;
  deleted?: boolean;
}
