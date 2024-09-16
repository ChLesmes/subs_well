import { IAddon } from "../interfaces/addon.interface";

export class Addon {
  public _id?: string;
  public name: string;
  public apiKey?: string;
  public secretKey?: string;
  public deleted: boolean;

  constructor({_id, name, apiKey, secretKey, deleted = false}: IAddon) {
    this._id = _id;
    this.name = name;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.deleted = deleted;
  }

  markAsDeleted() {
    this.deleted = true;
  }
}
