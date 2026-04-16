import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { HeroesRepository } from '../repository/heroes.repository';
import { UUID } from 'crypto';
import { Hero } from '../../generated/prisma/client';

@Injectable()
export class HeroesService {
  constructor(private readonly heroesRepository: HeroesRepository) {}

  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.heroesRepository.create(createHeroDto);
  }

  async findAll(): Promise<Hero[]> {
    return this.heroesRepository.findAll();
  }

  async findById(id: UUID): Promise<Hero> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new NotFoundException(`Herói com ID "${id}" não encontrado`);
    }

    return hero;
  }

  async update(id: UUID, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    await this.findById(id);
    return this.heroesRepository.update(id, updateHeroDto);
  }

  async delete(id: UUID): Promise<Hero> {
    await this.findById(id);
    return this.heroesRepository.delete(id);
  }
}
