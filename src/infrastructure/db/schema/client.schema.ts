import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";
import { Subscription } from './subscription.schema';
import { Account } from './account.schema';

@Schema({timestamps: true})
export class Client extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ type: Types.ObjectId, ref: Account.name })
  accountId?: Types.ObjectId;
  @Prop({ type: [Types.ObjectId], ref: Subscription.name, required: false })
  subscriptionIds?: Types.ObjectId[];
  @Prop({ default: false })
  deleted: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
