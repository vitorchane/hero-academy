import type { Hero } from "../types/hero";
import { ActionMenu } from "./ActionMenu";
import "./HeroCard.css";

interface Props {
  hero: Hero;
  onClick: (hero: Hero) => void;
  onEdit: (hero: Hero) => void;
  onDelete: (hero: Hero) => void;
  onActivate: (hero: Hero) => void;
}

export function HeroCard({
  hero,
  onClick,
  onEdit,
  onDelete,
  onActivate,
}: Props) {
  return (
    <div
      className={`hero-card ${!hero.is_active ? "inactive" : ""}`}
      onClick={() => onClick(hero)}
    >
      <div className="hero-avatar">
        <ActionMenu
          onEdit={hero.is_active ? () => onEdit(hero) : undefined}
          onDelete={hero.is_active ? () => onDelete(hero) : undefined}
          onActivate={!hero.is_active ? () => onActivate(hero) : undefined}
        />
        <img
          src={hero.avatar_url}
          alt={hero.nickname}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(hero.nickname)}&background=7c3aed&color=fff&size=200`;
          }}
        />
        {!hero.is_active && <span className="inactive-badge">Inativo</span>}
      </div>
    </div>
  );
}
