import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';


export const handleExceptions = (error: any): void => {
  if (error instanceof HttpException) throw error;
  if (error.code === 11000) {
    throw new BadRequestException(error.message);
  }
  console.log(error);
  throw new InternalServerErrorException(error.detail || error.message);
};
