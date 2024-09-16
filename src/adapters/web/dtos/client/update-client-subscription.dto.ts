import { isValidObjectId, Types } from "mongoose";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";
import { BadRequestException } from "@nestjs/common";
import { SubscriptionTypes } from "src/domain/enums/subscription-types.enum";
import { States } from "src/domain/enums/states";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateClientSubscriptionDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly addonId?: string;

  @ApiProperty({enum: States})
  @IsNotEmpty()
  @IsIn(Object.values(States))
  readonly state: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly totalAmount?: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly amountSpent?: number;

}
