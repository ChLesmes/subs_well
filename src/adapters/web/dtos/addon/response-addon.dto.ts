
export class ResponseAddonDto {
  readonly id: string;
  readonly name: string;

  constructor(addon: any) {
    this.id = addon._id;
    this.name = addon.name;
  }
}