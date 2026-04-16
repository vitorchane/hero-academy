import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Hero } from '../../generated/prisma/client';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import {
  HEROES_REPOSITORY,
  IHeroesRepository,
} from '../repository/heroes-repository.interface';

@Injectable()
export class HeroesService {
  constructor(
    @Inject(HEROES_REPOSITORY)
    private readonly heroesRepository: IHeroesRepository,
  ) {}

  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.heroesRepository.create(createHeroDto);
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const { data, total } = await this.heroesRepository.findAll(
      page,
      limit,
      search,
    );

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: UUID): Promise<Hero> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new NotFoundException(`Herói com ID "${id}" não encontrado`);
    }

    return hero;
  }

  async update(id: UUID, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    const hero = await this.findById(id);

    const isOnlyActivating =
      updateHeroDto.is_active === true &&
      Object.keys(updateHeroDto).length === 1;

    if (!hero.is_active && !isOnlyActivating) {
      throw new BadRequestException(
        'Não é possível editar um herói desativado',
      );
    }

    return this.heroesRepository.update(id, updateHeroDto);
  }

  async delete(id: UUID): Promise<Hero> {
    await this.findById(id);
    return this.heroesRepository.delete(id);
  }
}
