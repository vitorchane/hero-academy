import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Hero } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { IHeroesRepository } from './heroes-repository.interface';

@Injectable()
export class HeroesRepository implements IHeroesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHeroDto): Promise<Hero> {
    return this.prisma.hero.create({ data });
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: Hero[]; total: number }> {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { nickname: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.hero.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.hero.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: UUID): Promise<Hero | null> {
    return this.prisma.hero.findUnique({ where: { id } });
  }

  async update(id: UUID, data: UpdateHeroDto): Promise<Hero> {
    return this.prisma.hero.update({ where: { id }, data });
  }

  async delete(id: UUID): Promise<Hero> {
    return this.prisma.hero.delete({ where: { id } });
  }
}
