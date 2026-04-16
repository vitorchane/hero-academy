import { Module } from '@nestjs/common';
import { HeroesController } from './controller/heroes.controller';
import { HEROES_REPOSITORY } from './repository/heroes-repository.interface';
import { HeroesRepository } from './repository/heroes.repository';
import { HeroesService } from './service/heroes.service';

@Module({
  controllers: [HeroesController],
  providers: [
    HeroesService,
    {
      provide: HEROES_REPOSITORY,
      useClass: HeroesRepository,
    },
  ],
  exports: [HeroesService],
})
export class HeroesModule {}
