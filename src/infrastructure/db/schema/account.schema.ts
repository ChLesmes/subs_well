
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";
import { Subscription, SubscriptionSchema } from './subscription.schema';


@Schema({timestamps: true})
export class Account extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ type: Types.ObjectId, ref: Subscription.name, required: false })
  subscriptionId?: Types.ObjectId;
  @Prop({ default: false })
  deleted: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

