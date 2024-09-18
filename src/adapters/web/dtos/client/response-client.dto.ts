import { ApiProperty } from "@nestjs/swagger";
import { ResponseAccountDto } from "../account/response-account.dto";

class ClientSubscription {
  @ApiProperty()
  id: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  addon: string;
  @ApiProperty({nullable: true})
  totalAmount?: string;
  @ApiProperty({nullable: true})
  amountSpent?: string;
}

class ClientAccount {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: string;
}

export class ResponseClientDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty({nullable: true, type: ClientAccount})
  readonly account?: ResponseAccountDto | string;
  @ApiProperty({nullable: true, type: ClientSubscription})
  readonly subscriptions?: ClientSubscription[] | string[];

  constructor(client: any) {
    this.id = client._id;
    this.name = client.name;
    this.email = client.email;
    this.account = new ResponseAccountDto(client.accountId) || client.accountId;
    // {
    //   id: client.accountId?._id || client.accountId,
    //   name: client.accountId?.name,
    //   status: client.accountId?.status,
    // };
    this.subscriptions = client.subscriptionIds?.map((s: any) => ({
      id: s._id || s,
      state: s.state,
      addon: s.addonId,
      totalAmount: s.totalAmount,
      amountSpent: s.amountSpent,
    }));
  }
}