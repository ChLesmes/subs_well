import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async findById(id: string): Promise<Account | null> {
    return this.accountModel.findById(id).exec();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async create(account: Account): Promise<Account> {
    const newAccount = new this.accountModel(account);
    return newAccount.save();
  }

  async update(id: string, account: Account): Promise<Account> {
    return this.accountModel.findByIdAndUpdate(id, account, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.accountModel.findByIdAndDelete(id).exec();
  }
}