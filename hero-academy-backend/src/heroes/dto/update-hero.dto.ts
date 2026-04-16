import { ApiPropertyOptional } from '@nestjs/swagger';
import { Power } from '../enums/power.enum';
import { Universe } from '../enums/universe.enum';

export class UpdateHeroDto {
  @ApiPropertyOptional({ example: 'Peter Parker' })
  name?: string;

  @ApiPropertyOptional({ example: 'Homem-Aranha' })
  nickname?: string;

  @ApiPropertyOptional({ example: '2001-08-10T00:00:00.000Z' })
  date_of_birth?: Date;

  @ApiPropertyOptional({ enum: Universe, example: Universe.MARVEL })
  universe?: Universe;

  @ApiPropertyOptional({ enum: Power, example: Power.LANCAMENTO_DE_TEIAS })
  main_power?: Power;

  @ApiPropertyOptional({ example: 'https://example.com/spiderman.png' })
  avatar_url?: string;
}
