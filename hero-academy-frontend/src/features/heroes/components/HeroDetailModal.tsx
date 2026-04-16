import { getPowerLabel, getUniverseLabel } from "../constants/heroOptions";
import type { Hero } from "../types/hero";
import "./HeroDetailModal.css";

interface Props {
  hero: Hero;
  onClose: () => void;
}

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
                  {getUniverseLabel(hero.universe)}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-label">Habilidade</span>
                <span className="detail-value power">
                  {getPowerLabel(hero.main_power)}
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
