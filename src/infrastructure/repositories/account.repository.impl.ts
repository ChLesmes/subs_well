import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async findById(id: string): Promise<Account | null> {
    const account = await this.accountModel.findOne({_id: id, deleted: { $ne: true }}).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find({deleted: { $ne: true }}).exec();
  }

  async create(account: Account): Promise<Account> {
    const newAccount = new this.accountModel(account);
    return newAccount.save();
  }

  async update(id: string, accountData: Partial<Account>): Promise<Account> {
    const updatedAccount = await this.accountModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, accountData, { new: true }).exec();
    if (!updatedAccount) {
      throw new NotFoundException('Account not found');
    }
    return updatedAccount;
  }

  async softDelete(id: string): Promise<void> {
    const deleteAccount = await this.accountModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, { deleted: true }).exec();
    if (!deleteAccount) {
      throw new NotFoundException('Account not found');
    }
  }
}