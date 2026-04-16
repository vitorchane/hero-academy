export const UNIVERSE_OPTIONS = [
  "MARVEL",
  "DC",
  "STAR_WARS",
  "SENHOR_DOS_ANEIS",
  "HARRY_POTTER",
  "DRAGON_BALL",
  "NARUTO",
  "ONE_PIECE",
  "BEN_10",
  "AVATAR",
  "DISNEY",
  "TRANSFORMERS",
  "THUNDERCATS",
] as const;

export const POWER_OPTIONS = [
  "SUPER_FORCA",
  "SUPER_VELOCIDADE",
  "VOO",
  "TELEPATIA",
  "TELECINESE",
  "MAGIA",
  "FATOR_DE_CURA",
  "SUPER_INTELIGENCIA",
  "AGILIDADE",
  "CONTROLE_ELEMENTAL",
  "METAMORFOSE",
  "INVISIBILIDADE",
  "MANIPULACAO_DO_TEMPO",
  "PROJECAO_DE_ENERGIA",
  "ARTES_MARCIAIS",
  "LANCAMENTO_DE_TEIAS",
  "VISAO_DE_LASER",
  "MAGNETISMO",
  "ELASTICIDADE",
  "DUPLICACAO",
  "TECNOPATIA",
  "NECROMANCIA",
  "CONTROLE_GRAVITACIONAL",
  "DISTORCAO_DA_REALIDADE",
  "PODER_COSMICO",
  "NINJUTSU",
  "GENJUTSU",
  "ALQUIMIA",
] as const;

export const UNIVERSE_LABELS: Record<string, string> = {
  MARVEL: "Marvel",
  DC: "DC",
  STAR_WARS: "Star Wars",
  SENHOR_DOS_ANEIS: "Senhor dos Anéis",
  HARRY_POTTER: "Harry Potter",
  DRAGON_BALL: "Dragon Ball",
  NARUTO: "Naruto",
  ONE_PIECE: "One Piece",
  BEN_10: "Ben 10",
  AVATAR: "Avatar",
  DISNEY: "Disney",
  TRANSFORMERS: "Transformers",
  THUNDERCATS: "Thundercats",
};

export const POWER_LABELS: Record<string, string> = {
  SUPER_FORCA: "Super Força",
  SUPER_VELOCIDADE: "Super Velocidade",
  VOO: "Voo",
  TELEPATIA: "Telepatia",
  TELECINESE: "Telecinese",
  MAGIA: "Magia",
  FATOR_DE_CURA: "Fator de Cura",
  SUPER_INTELIGENCIA: "Super Inteligência",
  AGILIDADE: "Agilidade",
  CONTROLE_ELEMENTAL: "Controle Elemental",
  METAMORFOSE: "Metamorfose",
  INVISIBILIDADE: "Invisibilidade",
  MANIPULACAO_DO_TEMPO: "Manipulação do Tempo",
  PROJECAO_DE_ENERGIA: "Projeção de Energia",
  ARTES_MARCIAIS: "Artes Marciais",
  LANCAMENTO_DE_TEIAS: "Lançamento de Teias",
  VISAO_DE_LASER: "Visão de Laser",
  MAGNETISMO: "Magnetismo",
  ELASTICIDADE: "Elasticidade",
  DUPLICACAO: "Duplicação",
  TECNOPATIA: "Tecnopatia",
  NECROMANCIA: "Necromancia",
  CONTROLE_GRAVITACIONAL: "Controle Gravitacional",
  DISTORCAO_DA_REALIDADE: "Distorção da Realidade",
  PODER_COSMICO: "Poder Cósmico",
  NINJUTSU: "Ninjutsu",
  GENJUTSU: "Genjutsu",
  ALQUIMIA: "Alquimia",
};

/** Retorna o label legível de um universo, ou o valor original formatado como fallback */
export function getUniverseLabel(value: string): string {
  return UNIVERSE_LABELS[value] ?? value.replace(/_/g, " ");
}

/** Retorna o label legível de um poder, ou o valor original formatado como fallback */
export function getPowerLabel(value: string): string {
  return POWER_LABELS[value] ?? value.replace(/_/g, " ");
}
