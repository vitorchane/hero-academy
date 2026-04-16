import type { Hero } from "../types/hero";
import "./HeroDetailModal.css";

interface Props {
  hero: Hero;
  onClose: () => void;
}

const powerLabels: Record<string, string> = {
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

const universeLabels: Record<string, string> = {
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

export function HeroDetailModal({ hero, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="detail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="detail-close" onClick={onClose}>
          ✕
        </button>
        <div className="detail-body">
          <div className="detail-hero-avatar">
            <img
              src={hero.avatar_url}
              alt={hero.nickname}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(hero.nickname)}&background=7c3aed&color=fff&size=200`;
              }}
            />
          </div>
          <div className="detail-info">
            <div className="detail-hero-header">
              <h2>{hero.nickname}</h2>
              <p className="detail-real-name">{hero.name}</p>
              <span
                className={`detail-status ${hero.is_active ? "active" : "inactive"}`}
              >
                {hero.is_active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="detail-fields">
              <div className="detail-field">
                <span className="detail-label">Universo</span>
                <span className="detail-value universe">
                  {universeLabels[hero.universe] ?? hero.universe}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Habilidade</span>
                <span className="detail-value power">
                  {powerLabels[hero.main_power] ?? hero.main_power}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Nascimento</span>
                <span className="detail-value">
                  {new Date(hero.date_of_birth).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Criado em</span>
                <span className="detail-value">
                  {new Date(hero.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Atualizado em</span>
                <span className="detail-value">
                  {new Date(hero.updated_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
