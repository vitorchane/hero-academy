import { useState } from "react";
import {
  POWER_OPTIONS,
  UNIVERSE_OPTIONS,
  getPowerLabel,
  getUniverseLabel,
} from "../constants/heroOptions";
import "./EditHeroModal.css";

interface CreateHeroData {
  name: string;
  nickname: string;
  date_of_birth: string;
  universe: string;
  main_power: string;
  avatar_url: string;
  is_active: boolean;
}

interface Props {
  onSave: (data: CreateHeroData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function CreateHeroModal({ onSave, onCancel, loading }: Props) {
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    date_of_birth: "",
    universe: "MARVEL",
    main_power: "SUPER_FORCA",
    avatar_url: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      date_of_birth: new Date(form.date_of_birth).toISOString(),
      is_active: true,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Novo Herói</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Nome Completo</span>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex: Peter Parker"
                required
              />
            </label>
            <label>
              <span>Nome de Guerra</span>
              <input
                value={form.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                placeholder="Ex: Homem-Aranha"
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
                {UNIVERSE_OPTIONS.map((u) => (
                  <option key={u} value={u}>
                    {getUniverseLabel(u)}
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
                {POWER_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {getPowerLabel(p)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Avatar URL</span>
              <input
                value={form.avatar_url}
                onChange={(e) => handleChange("avatar_url", e.target.value)}
                placeholder="https://exemplo.com/avatar.png"
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
              {loading ? "Criando..." : "Criar Herói"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
