import { Test, TestingModule } from '@nestjs/testing';
import { AddonService } from '../addon.service';
import { ADDON_REPOSITORY } from '../../../domain/repositories/addon.repository';
import { Addon } from '../../../domain/entities/addon.entity';
import { CreateAddonDto } from '../../../adapters/web/dtos/addon/create-addon.dto';
import { UpdateAddonDto } from '../../../adapters/web/dtos/addon/update-addon.dto';

describe('AddonService', () => {
  let service: AddonService;
  let mockAddonRepository: any;

  beforeEach(async () => {
    mockAddonRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddonService,
        {
          provide: ADDON_REPOSITORY,
          useValue: mockAddonRepository,
        },
      ],
    }).compile();

    service = module.get<AddonService>(AddonService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('debería retornar un array de addons', async () => {
      const mockAddons = [new Addon({ name: 'Addon 1' }), new Addon({ name: 'Addon 2' })];
      mockAddonRepository.findAll.mockResolvedValue(mockAddons);

      const result = await service.getAll();

      expect(result).toEqual(mockAddons);
      expect(mockAddonRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('debería retornar un addon por su id', async () => {
      const _id = 'idtest01';
      const mockAddon = new Addon({ _id, name: 'Addon 1' });
      mockAddonRepository.findById.mockResolvedValue(mockAddon);

      const result = await service.getById(_id);

      expect(result).toEqual(mockAddon);
      expect(mockAddonRepository.findById).toHaveBeenCalledWith(_id);
    });
  });

  describe('create', () => {
    it('debería crear un nuevo addon', async () => {
      const createAddonDto: CreateAddonDto = { name: 'Addon 1' };
      const mockCreatedAddon = new Addon(createAddonDto);
      mockAddonRepository.create.mockResolvedValue(mockCreatedAddon);

      const result = await service.create(createAddonDto);

      expect(result).toEqual(mockCreatedAddon);
      expect(mockAddonRepository.create).toHaveBeenCalledWith(expect.any(Addon));
    });
  });

  describe('update', () => {
    it('debería actualizar un addon existente', async () => {
      const _id = 'idtest01';
      const updateAddonDto: UpdateAddonDto = { name: 'Updated Addon' };
      const mockUpdatedAddon = new Addon({ _id, name: 'Updated Addon' });
      mockAddonRepository.update.mockResolvedValue(mockUpdatedAddon);

      const result = await service.update(_id, updateAddonDto);

      expect(result).toEqual(mockUpdatedAddon);
      expect(mockAddonRepository.update).toHaveBeenCalledWith(_id, updateAddonDto);
    });
  });

  describe('softDelete', () => {
    it('debería eliminar suavemente un addon', async () => {
      const _id = 'idtest01';
      await service.softDelete(_id);

      expect(mockAddonRepository.softDelete).toHaveBeenCalledWith(_id);
    });
  });
});