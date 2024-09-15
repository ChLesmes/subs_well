import { isValidObjectId, Types } from "mongoose";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { BadRequestException } from "@nestjs/common";


export class CreateClientDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (!value) return;
    if (!isValidObjectId(value)) throw new BadRequestException('Account is not a valid ObjectId');
    return new Types.ObjectId(value);
  })
  readonly account?: Types.ObjectId;

}
