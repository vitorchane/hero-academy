import { Test, TestingModule } from '@nestjs/testing';
import { UUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { HeroesRepository } from './heroes.repository';

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

const mockPrismaService = {
  hero: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('HeroesRepository', () => {
  let repository: HeroesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<HeroesRepository>(HeroesRepository);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a hero', async () => {
      mockPrismaService.hero.create.mockResolvedValue(mockHero);
      const dto = {
        name: 'Peter Parker',
        nickname: 'Homem-Aranha',
        date_of_birth: new Date('2001-08-10'),
        universe: 'MARVEL' as any,
        main_power: 'LANCAMENTO_DE_TEIAS' as any,
        avatar_url: 'https://example.com/spiderman.png',
        is_active: true,
      };

      const result = await repository.create(dto);

      expect(result).toEqual(mockHero);
      expect(mockPrismaService.hero.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return paginated heroes', async () => {
      mockPrismaService.$transaction.mockResolvedValue([[mockHero], 1]);

      const result = await repository.findAll(1, 10);

      expect(result).toEqual({ data: [mockHero], total: 1 });
    });

    it('should apply search filter', async () => {
      mockPrismaService.$transaction.mockResolvedValue([[], 0]);

      await repository.findAll(1, 10, 'spider');

      expect(mockPrismaService.$transaction).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a hero by id', async () => {
      mockPrismaService.hero.findUnique.mockResolvedValue(mockHero);

      const result = await repository.findById(mockHero.id);

      expect(result).toEqual(mockHero);
      expect(mockPrismaService.hero.findUnique).toHaveBeenCalledWith({
        where: { id: mockHero.id },
      });
    });

    it('should return null when hero not found', async () => {
      mockPrismaService.hero.findUnique.mockResolvedValue(null);

      const result = await repository.findById('non-existent' as UUID);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a hero', async () => {
      const updated = { ...mockHero, name: 'Updated' };
      mockPrismaService.hero.update.mockResolvedValue(updated);

      const result = await repository.update(mockHero.id, { name: 'Updated' });

      expect(result).toEqual(updated);
      expect(mockPrismaService.hero.update).toHaveBeenCalledWith({
        where: { id: mockHero.id },
        data: { name: 'Updated' },
      });
    });
  });

  describe('delete', () => {
    it('should delete a hero', async () => {
      mockPrismaService.hero.delete.mockResolvedValue(mockHero);

      const result = await repository.delete(mockHero.id);

      expect(result).toEqual(mockHero);
      expect(mockPrismaService.hero.delete).toHaveBeenCalledWith({
        where: { id: mockHero.id },
      });
    });
  });
});
