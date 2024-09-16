import { ApiProperty } from "@nestjs/swagger";

class ClientSubscription {
  id: string;
  state: string;
  addon: string;
  totalAmount?: string;
  amountSpent?: string;
}

class ClientAccount {
  id: string;
  name: string;
}

export class ResponseClientDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty({nullable: true, type: ClientAccount})
  readonly account?: ClientAccount | string;
  @ApiProperty({nullable: true, type: ClientSubscription})
  readonly subscriptions?: ClientSubscription[] | string[];

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