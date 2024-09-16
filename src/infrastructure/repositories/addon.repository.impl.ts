import { Injectable, NotFoundException } from '@nestjs/common';
import { AddonRepository } from '../../domain/repositories/addon.repository';
import { Addon } from '../../domain/entities/addon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AddonRepositoryImpl implements AddonRepository {
  constructor(@InjectModel(Addon.name) private addonModel: Model<Addon>) {}

  async findById(id: string): Promise<Addon | null> {
    const addon = await this.addonModel
      .findOne({_id: id, deleted: { $ne: true }})
      .exec();
    if (!addon) {
      throw new NotFoundException('Addon not found');
    }
    return addon;
  }

  async findAll(): Promise<Addon[]> {
    return this.addonModel
      .find({deleted: { $ne: true }})
      .exec();
  }

  async create(addon: Addon): Promise<Addon> {
    return await this.addonModel.create(addon);
  }

  async update(id: string, addonData: Partial<Addon>): Promise<Addon> {
    const updatedAddon = await this.addonModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, addonData, { new: true }).exec();
    if (!updatedAddon) {
      throw new NotFoundException('Addon not found');
    }
    return updatedAddon;
  }

  async softDelete(id: string): Promise<void> {
    const deleteAddon = await this.addonModel.findOneAndUpdate({_id: id, deleted: { $ne: true }}, { deleted: true }).exec();
    if (!deleteAddon) {
      throw new NotFoundException('Addon not found');
    }
  }
}