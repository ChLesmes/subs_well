import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddonRepositoryImpl } from '../addon.repository.impl';
import { Addon } from '../../../domain/entities/addon.entity';
import { NotFoundException } from '@nestjs/common';

describe('AddonRepositoryImpl', () => {
  let repository: AddonRepositoryImpl;
  let model: Model<Addon>;

  const mockAddon = {
    _id: 'mockId',
    name: 'Mock Addon',
    deleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddonRepositoryImpl,
        {
          provide: getModelToken(Addon.name),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<AddonRepositoryImpl>(AddonRepositoryImpl);
    model = module.get<Model<Addon>>(getModelToken(Addon.name));
  });

  describe('findById', () => {
    it('debería encontrar un addon por id', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAddon),
      } as any);

      const result = await repository.findById('mockId');
      expect(result).toEqual(mockAddon);
    });

    it('debería lanzar NotFoundException si no se encuentra el addon', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(repository.findById('nonExistentId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debería encontrar todos los addons no eliminados', async () => {
      const mockAddons = [mockAddon];
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAddons),
      } as any);

      const result = await repository.findAll();
      expect(result).toEqual(mockAddons);
    });
  });

  describe('create', () => {
    it('debería crear un nuevo addon', async () => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(mockAddon as any);

      const result = await repository.create(mockAddon as Addon);
      expect(result).toEqual(mockAddon);
    });
  });

  describe('update', () => {
    it('debería actualizar un addon existente', async () => {
      const updatedAddon = { ...mockAddon, name: 'Updated Addon' };
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedAddon),
      } as any);

      const result = await repository.update('mockId', { name: 'Updated Addon' });
      expect(result).toEqual(updatedAddon);
    });

    it('debería lanzar NotFoundException si no se encuentra el addon para actualizar', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(repository.update('nonExistentId', { name: 'Updated Addon' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('debería eliminar suavemente un addon existente', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({ ...mockAddon, deleted: true }),
      } as any);

      await expect(repository.softDelete('mockId')).resolves.not.toThrow();
    });

    it('debería lanzar NotFoundException si no se encuentra el addon para eliminar suavemente', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(repository.softDelete('nonExistentId')).rejects.toThrow(NotFoundException);
    });
  });
});