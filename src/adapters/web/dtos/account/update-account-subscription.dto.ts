import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { States } from "src/domain/enums/states";
import { SubscriptionTypes } from "src/domain/enums/subscription-types.enum";


export class UpdateAccountSubscriptionDto {

  @IsString()
  @IsIn(Object.values(SubscriptionTypes))
  readonly type: string;

  @IsString()
  @IsIn(Object.values(States))
  readonly state: string;

}
