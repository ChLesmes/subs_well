
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";
import { Subscription, SubscriptionSchema } from './subscription.schema';


@Schema({timestamps: true})
export class Account extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ type: SubscriptionSchema, required: false })
  subscriptions?: Subscription;
  @Prop({ default: false })
  deleted: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

