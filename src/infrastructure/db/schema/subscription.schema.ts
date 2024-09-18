import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";
import { Addon } from './addon.schema';
import { SubscriptionTypes } from '../../../domain/enums/subscription-types.enum';
import { States } from '../../../domain/enums/states';

@Schema({timestamps: true})
export class Subscription extends Document {
  @Prop({ enum: SubscriptionTypes })
  type: string;
  @Prop({ enum: States, default: States.Active })
  state: string;
  @Prop()
  totalAmount?: number;
  @Prop()
  amountSpent?: number;
  @Prop({ type: Types.ObjectId, ref: Addon.name, required: false })
  addonId?: Types.ObjectId;
  @Prop({ default: false })
  deleted: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
