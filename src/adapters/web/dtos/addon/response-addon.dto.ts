import { ApiProperty } from "@nestjs/swagger";

export class ResponseAddonDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly name: string;

  constructor(addon: any) {
    this.id = addon._id;
    this.name = addon.name;
  }
}