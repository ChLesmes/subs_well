
export class ResponseAccountDto {
  readonly id: string;
  readonly name: string;
  readonly type: string;

  constructor(account: any) {
    this.id = account._id;
    this.name = account.name;
    this.type = account.type;
  }
}