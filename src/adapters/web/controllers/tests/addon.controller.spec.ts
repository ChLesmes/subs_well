import { Test, TestingModule } from '@nestjs/testing';
import { AddonController } from '../addon.controller';
import { AddonService } from '../../../../application/services/addon.service';
import { CreateAddonDto } from '../../dtos/addon/create-addon.dto';
import { UpdateAddonDto } from '../../dtos/addon/update-addon.dto';
import { ResponseAddonDto } from '../../dtos/addon/response-addon.dto';
import { Addon } from '../../../../domain/entities/addon.entity';

describe('AddonController', () => {
  let controller: AddonController;
  let service: AddonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddonController],
      providers: [
        {
          provide: AddonService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddonController>(AddonController);
    service = module.get<AddonService>(AddonService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Debería crear un addon', async () => {
      const createAddonDto: CreateAddonDto = { name: 'Test Addon' };
      const expectedResult = new ResponseAddonDto({ _id: expect.any(String), name: 'Test Addon' });
      const newAddon = new Addon({ _id: expect.any(String), name: 'Test Addon' });
      jest.spyOn(service, 'create').mockResolvedValue(newAddon);

      const result = await controller.create(createAddonDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createAddonDto);
    });
  });

  describe('getAll', () => {
    it('debería obtener todos los addons', async () => {
      const expectedResult = [new ResponseAddonDto({ _id: expect.any(String), name: 'Addon 1' })];
      const addons = [new Addon({ _id: expect.any(String), name: 'Addon 1' })];
      jest.spyOn(service, 'getAll').mockResolvedValue(addons);

      const result = await controller.getAll();
      expect(result).toEqual(expectedResult);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('Debería obtener un addon por su id', async () => {
      const _id = 'idtest01';
      const expectedResult = new ResponseAddonDto({ _id, name: 'Addon 1' });
      const addon = new Addon({ _id, name: 'Addon 1' });
      jest.spyOn(service, 'getById').mockResolvedValue(addon);

      const result = await controller.getById(_id);
      expect(result).toEqual(expectedResult);
      expect(service.getById).toHaveBeenCalledWith(_id);
    });
  });

  describe('updateAddon', () => {
    it('Debería actualizar un addon', async () => {
      const _id = 'idtest01';
      const updateAddonDto: UpdateAddonDto = { name: 'Updated Addon' };
      const addon = new Addon({ _id, name: updateAddonDto.name });
      const expectedResult = new ResponseAddonDto({ _id, name: updateAddonDto.name });
      jest.spyOn(service, 'update').mockResolvedValue(addon);

      const result = await controller.updateAddon(_id, updateAddonDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(_id, updateAddonDto);
    });
  });

  describe('delete', () => {
    it('Debería eliminar un addon', async () => {
      const _id = 'idtest01';
      const expectedResult = { message: 'Addon deleted successfully' };
      jest.spyOn(service, 'softDelete').mockResolvedValue(undefined);

      const result = await controller.delete(_id);
      expect(result).toEqual(expectedResult);
      expect(service.softDelete).toHaveBeenCalledWith(_id);
    });
  });
});