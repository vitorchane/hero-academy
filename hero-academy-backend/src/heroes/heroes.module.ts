import { Module } from '@nestjs/common';
import { HeroesController } from './controller/heroes.controller';
import { HeroesRepository } from './repository/heroes.repository';
import { HeroesService } from './service/heroes.service';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService, HeroesRepository],
  exports: [HeroesService],
})
export class HeroesModule {}
