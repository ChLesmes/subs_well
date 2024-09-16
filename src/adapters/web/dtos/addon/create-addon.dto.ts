import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateAddonDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  readonly apiKey?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  readonly secretKey?: string;

}
