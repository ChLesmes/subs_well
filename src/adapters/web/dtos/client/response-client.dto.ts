
export class ResponseClientDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly account?: {
    id: string;
    name: string;
  } | string;
  readonly subscriptions?: {
    id: string;
    state: string;
    addon: string;
    totalAmount?: string;
    amountSpent?: string;
  }[] | string;

  constructor(client: any) {
    this.id = client._id;
    this.name = client.name;
    this.email = client.email;
    this.account = {
      id: client.accountId?._id || client.accountId,
      name: client.accountId?.name,
    };
    this.subscriptions = client.subscriptionIds?.map(s=>({
      id: s._id || s,
      state: s.state,
      addon: s.addonId,
      totalAmount: s.totalAmount,
      amountSpent: s.amountSpent,
    }));
  }
}