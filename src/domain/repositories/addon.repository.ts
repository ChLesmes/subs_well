import { Addon } from '../entities/addon.entity';

export const ADDON_REPOSITORY = 'ADDON_REPOSITORY';

export interface AddonRepository {
  findById(id: string): Promise<Addon | null>;
  findAll(): Promise<Addon[]>;
  create(addon: Addon): Promise<Addon>;
  update(id: string, addonData: Partial<Addon>): Promise<Addon>;
  softDelete(id: string): Promise<void>;
}