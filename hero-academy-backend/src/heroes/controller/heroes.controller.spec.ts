import { Test, TestingModule } from '@nestjs/testing';
import { UUID } from 'crypto';
import { HeroesService } from '../service/heroes.service';
import { HeroesController } from './heroes.controller';

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

const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('HeroesController', () => {
  let controller: HeroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [{ provide: HeroesService, useValue: mockService }],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a hero', async () => {
      mockService.create.mockResolvedValue(mockHero);
      const dto = {
        name: 'Peter Parker',
        nickname: 'Homem-Aranha',
        date_of_birth: new Date('2001-08-10'),
        universe: 'MARVEL' as any,
        main_power: 'LANCAMENTO_DE_TEIAS' as any,
        avatar_url: 'https://example.com/spiderman.png',
        is_active: true,
      };

      const result = await controller.create(dto);

      expect(result).toEqual(mockHero);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return paginated heroes', async () => {
      const response = {
        data: [mockHero],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };
      mockService.findAll.mockResolvedValue(response);

      const result = await controller.findAll(1, 10);

      expect(result).toEqual(response);
      expect(mockService.findAll).toHaveBeenCalledWith(1, 10, undefined);
    });

    it('should pass search parameter', async () => {
      mockService.findAll.mockResolvedValue({ data: [], meta: {} });

      await controller.findAll(1, 10, 'spider');

      expect(mockService.findAll).toHaveBeenCalledWith(1, 10, 'spider');
    });
  });

  describe('findById', () => {
    it('should return a hero by id', async () => {
      mockService.findById.mockResolvedValue(mockHero);

      const result = await controller.findById(mockHero.id);

      expect(result).toEqual(mockHero);
    });
  });

  describe('update', () => {
    it('should update a hero', async () => {
      const updated = { ...mockHero, name: 'Updated' };
      mockService.update.mockResolvedValue(updated);

      const result = await controller.update(mockHero.id, { name: 'Updated' });

      expect(result).toEqual(updated);
    });
  });

  describe('delete', () => {
    it('should delete a hero', async () => {
      mockService.delete.mockResolvedValue(mockHero);

      await controller.delete(mockHero.id);

      expect(mockService.delete).toHaveBeenCalledWith(mockHero.id);
    });
  });
});
