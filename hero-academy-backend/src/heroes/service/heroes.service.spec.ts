import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UUID } from 'crypto';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import {
  HEROES_REPOSITORY,
  IHeroesRepository,
} from '../repository/heroes-repository.interface';
import { HeroesService } from './heroes.service';

const mockHero = {
  id: '123e4567-e89b-12d3-a456-426614174000' as UUID,
  name: 'Peter Parker',
  nickname: 'Homem-Aranha',
  date_of_birth: new Date('2001-08-10'),
  universe: 'MARVEL' as const,
  main_power: 'LANCAMENTO_DE_TEIAS' as const,
  avatar_url: 'https://example.com/spiderman.png',
  is_active: true,
  created_at: new Date(),
  updated_at: new Date(),
};

const mockRepository: jest.Mocked<IHeroesRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        { provide: HEROES_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<HeroesService>(HeroesService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a hero', async () => {
      const dto: CreateHeroDto = {
        name: 'Peter Parker',
        nickname: 'Homem-Aranha',
        date_of_birth: new Date('2001-08-10'),
        universe: 'MARVEL' as any,
        main_power: 'LANCAMENTO_DE_TEIAS' as any,
        avatar_url: 'https://example.com/spiderman.png',
        is_active: true,
      };
      mockRepository.create.mockResolvedValue(mockHero);

      const result = await service.create(dto);

      expect(result).toEqual(mockHero);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return paginated heroes', async () => {
      mockRepository.findAll.mockResolvedValue({
        data: [mockHero],
        total: 1,
      });

      const result = await service.findAll(1, 10);

      expect(result).toEqual({
        data: [mockHero],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      });
    });

    it('should calculate totalPages correctly', async () => {
      mockRepository.findAll.mockResolvedValue({
        data: [],
        total: 25,
      });

      const result = await service.findAll(1, 10);

      expect(result.meta.totalPages).toBe(3);
    });

    it('should pass search parameter', async () => {
      mockRepository.findAll.mockResolvedValue({ data: [], total: 0 });

      await service.findAll(1, 10, 'spider');

      expect(mockRepository.findAll).toHaveBeenCalledWith(1, 10, 'spider');
    });
  });

  describe('findById', () => {
    it('should return a hero when found', async () => {
      mockRepository.findById.mockResolvedValue(mockHero);

      const result = await service.findById(mockHero.id);

      expect(result).toEqual(mockHero);
    });

    it('should throw NotFoundException when hero not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById('non-existent' as UUID)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an active hero', async () => {
      const dto: UpdateHeroDto = { name: 'Peter B. Parker' };
      mockRepository.findById.mockResolvedValue(mockHero);
      mockRepository.update.mockResolvedValue({ ...mockHero, ...dto });

      const result = await service.update(mockHero.id, dto);

      expect(result.name).toBe('Peter B. Parker');
    });

    it('should throw BadRequestException when editing inactive hero', async () => {
      const inactiveHero = { ...mockHero, is_active: false };
      mockRepository.findById.mockResolvedValue(inactiveHero);

      await expect(
        service.update(mockHero.id, { name: 'New Name' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow activating an inactive hero', async () => {
      const inactiveHero = { ...mockHero, is_active: false };
      mockRepository.findById.mockResolvedValue(inactiveHero);
      mockRepository.update.mockResolvedValue({ ...mockHero, is_active: true });

      const result = await service.update(mockHero.id, { is_active: true });

      expect(result.is_active).toBe(true);
    });

    it('should throw NotFoundException when hero does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.update('non-existent' as UUID, { name: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing hero', async () => {
      mockRepository.findById.mockResolvedValue(mockHero);
      mockRepository.delete.mockResolvedValue(mockHero);

      const result = await service.delete(mockHero.id);

      expect(result).toEqual(mockHero);
      expect(mockRepository.delete).toHaveBeenCalledWith(mockHero.id);
    });

    it('should throw NotFoundException when hero does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete('non-existent' as UUID)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
