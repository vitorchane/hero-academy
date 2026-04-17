import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';
import { Power, Universe } from '../../generated/prisma/enums';

export class CreateHeroDto {
  @ApiProperty({ example: 'Peter Parker' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Homem-Aranha' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ example: '2001-08-10T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  date_of_birth: Date;

  @ApiProperty({ enum: Universe, example: Universe.MARVEL })
  @IsEnum(Universe)
  @IsNotEmpty()
  universe: Universe;

  @ApiProperty({ enum: Power, example: Power.LANCAMENTO_DE_TEIAS })
  @IsEnum(Power)
  @IsNotEmpty()
  main_power: Power;

  @ApiProperty({ example: 'https://example.com/spiderman.png' })
  @IsNotEmpty()
  @IsUrl()
  avatar_url: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;
}
