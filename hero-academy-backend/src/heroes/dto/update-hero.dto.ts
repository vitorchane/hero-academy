import { Power } from '../enums/power.enum';
import { Universe } from '../enums/universe.enum';

export class UpdateHeroDto {
  name?: string;
  nickname?: string;
  date_of_birth?: Date;
  universe?: Universe;
  main_power?: Power;
  avatar_url?: string;
}
