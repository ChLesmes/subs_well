import { CreateAddonDto } from '../../adapters/web/dtos/addon/create-addon.dto';
import { Addon } from '../../domain/entities/addon.entity';
import { UpdateAddonDto } from '../../adapters/web/dtos/addon/update-addon.dto';

export interface IAddonService {
  getAll(): Promise<Addon[]>;
  getById(id: string): Promise<Addon>;
  create(createAddonDto: CreateAddonDto): Promise<Addon>;
  update(id: string, updateAddonDto: UpdateAddonDto): Promise<Addon>;
  softDelete(id: string): Promise<void>;
}