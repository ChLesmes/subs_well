import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ADDON_REPOSITORY, AddonRepository } from '../../domain/repositories/addon.repository';
import { Addon } from 'src/domain/entities/addon.entity';
import { CreateAddonDto } from 'src/adapters/web/dtos/addon/create-addon.dto';
import { UpdateAddonDto } from 'src/adapters/web/dtos/addon/update-addon.dto';
import { IAddonService } from '../interfaces/IAddonService';

@Injectable()
export class AddonService implements IAddonService {

  constructor(
    @Inject(ADDON_REPOSITORY) 
    private readonly addonRepository: AddonRepository, 
  ) {}

  async getAll(): Promise<Addon[]> {
    return await this.addonRepository.findAll();
  }

  async getById(id: string): Promise<Addon> {
    return await this.addonRepository.findById(id);
  }

  async create(addonData: CreateAddonDto): Promise<Addon> {
    const addon = new Addon({...addonData});
    return await this.addonRepository.create(addon);
  }

  async update(id: string, addonData: UpdateAddonDto): Promise<Addon> {
    const updatedAddon = await this.addonRepository.update(id, addonData);
    return updatedAddon;
  }

  async softDelete(id: string): Promise<void> {
    await this.addonRepository.softDelete(id);
  }
}
