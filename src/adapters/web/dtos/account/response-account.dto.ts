import { ApiProperty } from '@nestjs/swagger';

class AccountSubscription {
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  state: string;
}

export class ResponseAccountDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly type: string;
  @ApiProperty({nullable: true, type: AccountSubscription})
  readonly subscription?: AccountSubscription | string;

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