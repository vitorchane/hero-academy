import { UUID } from 'crypto';
import { Hero } from '../../generated/prisma/client';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';

export const HEROES_REPOSITORY = Symbol('HEROES_REPOSITORY');

export interface IHeroesRepository {
  create(data: CreateHeroDto): Promise<Hero>;
  findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: Hero[]; total: number }>;
  findById(id: UUID): Promise<Hero | null>;
  update(id: UUID, data: UpdateHeroDto): Promise<Hero>;
  delete(id: UUID): Promise<Hero>;
}
