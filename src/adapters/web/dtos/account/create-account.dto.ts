import { isValidObjectId, Types } from "mongoose";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { BadRequestException } from "@nestjs/common";
import { SubscriptionTypes } from "src/domain/enums/subscription-types.enum";


export class CreateAccountDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(SubscriptionTypes))
  readonly type: string;

}
