
export class ResponseSubscriptionDto {
  readonly id: string;
  readonly type: string;
  readonly state: string;
  readonly totalAmount?: number;
  readonly amountSpent?: number;
  readonly addon?: {
    id: string;
    name: string;
  } | string;

  constructor(subscription: any) {
    this.id = subscription._id;
    this.type = subscription.type;
    this.state = subscription.state;
    this.addon = {
      id: subscription.addonId?._id || subscription.addonId,
      name: subscription.addonId?.name,
    };
  }
}