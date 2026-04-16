import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { HeroesService } from '../service/heroes.service';
import type { UUID } from 'crypto';
import {
  ApiCreate,
  ApiDelete,
  ApiFindAll,
  ApiFindById,
  ApiUpdate,
} from '../swagger/heroes.swagger';

@ApiTags('Heroes')
@Controller('api/v1/heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreate()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  @ApiFindAll()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    return this.heroesService.findAll(+page, +limit, search);
  }

  @Get(':id')
  @ApiFindById()
  findById(@Param('id') id: UUID) {
    return this.heroesService.findById(id);
  }

  @Patch(':id')
  @ApiUpdate()
  update(@Param('id') id: UUID, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDelete()
  delete(@Param('id') id: UUID) {
    return this.heroesService.delete(id);
  }
}
