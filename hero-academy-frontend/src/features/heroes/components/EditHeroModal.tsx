import { useState } from "react";
import type { Hero } from "../types/hero";
import "./EditHeroModal.css";

interface Props {
  hero: Hero;
  onSave: (data: Partial<Hero>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const universeOptions = [
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
];

const powerOptions = [
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
];

export function EditHeroModal({ hero, onSave, onCancel, loading }: Props) {
  const [form, setForm] = useState({
    name: hero.name,
    nickname: hero.nickname,
    date_of_birth: hero.date_of_birth.slice(0, 10),
    universe: hero.universe,
    main_power: hero.main_power,
    avatar_url: hero.avatar_url,
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      date_of_birth: new Date(form.date_of_birth).toISOString(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Herói</h3>
        <form onSubmit={handleSubmit}>
          <div className="readonly-fields">
            <div className="readonly-field">
              <span className="readonly-label">ID</span>
              <span className="readonly-value">{hero.id}</span>
            </div>
            <div className="readonly-field">
              <span className="readonly-label">Status</span>
              <span
                className={`readonly-value status ${hero.is_active ? "active" : "inactive"}`}
              >
                {hero.is_active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="readonly-field">
              <span className="readonly-label">Criado em</span>
              <span className="readonly-value">
                {new Date(hero.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="readonly-field">
              <span className="readonly-label">Atualizado em</span>
              <span className="readonly-value">
                {new Date(hero.updated_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          <div className="form-divider" />

          <div className="form-grid">
            <label>
              <span>Nome Completo</span>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </label>
            <label>
              <span>Nome de Guerra</span>
              <input
                value={form.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                required
              />
            </label>
            <label>
              <span>Data de Nascimento</span>
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                required
              />
            </label>
            <label>
              <span>Universo</span>
              <select
                value={form.universe}
                onChange={(e) => handleChange("universe", e.target.value)}
              >
                {universeOptions.map((u) => (
                  <option key={u} value={u}>
                    {u.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Habilidade</span>
              <select
                value={form.main_power}
                onChange={(e) => handleChange("main_power", e.target.value)}
              >
                {powerOptions.map((p) => (
                  <option key={p} value={p}>
                    {p.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Avatar URL</span>
              <input
                value={form.avatar_url}
                onChange={(e) => handleChange("avatar_url", e.target.value)}
                required
              />
            </label>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-btn save" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
