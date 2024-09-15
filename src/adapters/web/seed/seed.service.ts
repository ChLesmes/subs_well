import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { initialData } from './data/initial-data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Account } from 'src/infrastructure/db/schema/account.schema';

@Injectable()
export class SeedService {
  private defaultAdminPassword: string;
  private seedSecret: string;

  constructor(
    @InjectModel(Account.name)
    private readonly userModel: Model<Account>,
    private readonly configService: ConfigService,
  ){
    this.defaultAdminPassword = this.configService.get<string>('initialAdminPassword');
    this.seedSecret = this.configService.get<string>('seedSecret');
  }

  async executeSeed(seedSecret: string) {
    try {
      const users = this.userModel.find();
      if (!users || (await users).length > 0) throw new BadRequestException('Not executed.'); 
      await this.insertUsers();    
      return 'Seed executed';
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: Account[] = [];

    seedUsers.forEach(async (user) => {
      const password = this.defaultAdminPassword || user.password;
      users.push(await this.userModel.create({...user, password}));
    })

    return Promise.all(seedUsers);
  }
}
