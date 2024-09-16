
export class ResponseAccountDto {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly subscription?: {
    id: string;
    type: string;
    state: string;
  } | string;

  constructor(account: any) {
    this.id = account._id;
    this.name = account.name;
    this.type = account.type;
    this.subscription = {
      id: account.subscriptionId?._id || account.subscriptionId,
      type: account.subscriptionId?.type,
      state: account.subscriptionId?.state,
    };
  }
}