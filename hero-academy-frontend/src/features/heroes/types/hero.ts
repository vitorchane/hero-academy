export interface Hero {
  id: string;
  name: string;
  nickname: string;
  date_of_birth: string;
  universe: string;
  main_power: string;
  avatar_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HeroesMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HeroesResponse {
  data: Hero[];
  meta: HeroesMeta;
}
