import { ApiProperty } from '@nestjs/swagger';
import { Power } from '../enums/power.enum';
import { Universe } from '../enums/universe.enum';

export class CreateHeroDto {
  @ApiProperty({ example: 'Peter Parker' })
  name: string;

  @ApiProperty({ example: 'Homem-Aranha' })
  nickname: string;

  @ApiProperty({ example: '2001-08-10T00:00:00.000Z' })
  date_of_birth: Date;

  @ApiProperty({ enum: Universe, example: Universe.MARVEL })
  universe: Universe;

  @ApiProperty({ enum: Power, example: Power.LANCAMENTO_DE_TEIAS })
  main_power: Power;

  @ApiProperty({ example: 'https://example.com/spiderman.png' })
  avatar_url: string;

  @ApiProperty({ example: true })
  is_active: boolean;
}
