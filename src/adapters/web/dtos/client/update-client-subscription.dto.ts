import { isValidObjectId, Types } from "mongoose";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";
import { BadRequestException } from "@nestjs/common";
import { SubscriptionTypes } from "src/domain/enums/subscription-types.enum";
import { States } from "src/domain/enums/states";


export class UpdateClientSubscriptionDto {

  @IsString()
  @IsNotEmpty()
  readonly addonId?: string;

  @IsNotEmpty()
  @IsIn(Object.values(States))
  readonly state: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly totalAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly amountSpent?: number;

}
