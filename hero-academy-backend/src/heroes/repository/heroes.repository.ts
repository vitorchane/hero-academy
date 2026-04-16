import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { Hero } from '../../generated/prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class HeroesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHeroDto): Promise<Hero> {
    return this.prisma.hero.create({ data });
  }

  async findAll(): Promise<Hero[]> {
    return this.prisma.hero.findMany({
      orderBy: { created_at: 'desc' },
    });
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
