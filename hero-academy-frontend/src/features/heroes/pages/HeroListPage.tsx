import { useCallback, useState } from "react";
import type { ToastData } from "../../../components/ui/Toast";
import { ToastContainer } from "../../../components/ui/Toast";
import { createHero, deleteHero, updateHero } from "../api/heroesApi";
import { ConfirmModal } from "../components/ConfirmModal";
import { CreateHeroModal } from "../components/CreateHeroModal";
import { EditHeroModal } from "../components/EditHeroModal";
import { HeroCard } from "../components/HeroCard";
import { HeroDetailModal } from "../components/HeroDetailModal";
import { Pagination } from "../components/Pagination";
import { useHeroes } from "../hooks/useHeroes";
import type { Hero } from "../types/hero";
import "./HeroListPage.css";

let toastId = 0;

export function HeroListPage() {
  const {
    heroes,
    meta,
    initialLoading,
    loading,
    error,
    goToPage,
    refresh,
    search,
    setSearch,
  } = useHeroes();
  const [showCreate, setShowCreate] = useState(false);
  const [detailHero, setDetailHero] = useState<Hero | null>(null);
  const [editHero, setEditHero] = useState<Hero | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Hero | null>(null);
  const [activateTarget, setActivateTarget] = useState<Hero | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (message: string, type: "success" | "error") => {
    setToasts((prev) => [...prev, { id: ++toastId, message, type }]);
  };

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await deleteHero(deleteTarget.id);
      setDeleteTarget(null);
      addToast(
        `"${deleteTarget.nickname}" foi excluído com sucesso.`,
        "success",
      );
      refresh();
    } catch {
      addToast("Erro ao excluir herói. Tente novamente.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!activateTarget) return;
    setActionLoading(true);
    try {
      await updateHero(activateTarget.id, { is_active: true });
      setActivateTarget(null);
      addToast(
        `"${activateTarget.nickname}" foi reativado com sucesso.`,
        "success",
      );
      refresh();
    } catch {
      addToast("Erro ao ativar herói. Tente novamente.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSave = async (data: Partial<Hero>) => {
    if (!editHero) return;
    setActionLoading(true);
    try {
      await updateHero(editHero.id, data);
      setEditHero(null);
      addToast(`"${editHero.nickname}" foi atualizado com sucesso.`, "success");
      refresh();
    } catch {
      addToast("Erro ao salvar alterações. Tente novamente.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreate = async (data: Parameters<typeof createHero>[0]) => {
    setActionLoading(true);
    try {
      await createHero(data);
      setShowCreate(false);
      addToast("Herói criado com sucesso!", "success");
      refresh();
    } catch {
      addToast("Erro ao criar herói. Tente novamente.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="hero-list-status">
        <div className="spinner" />
        <p>Carregando heróis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-list-status">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (heroes.length === 0) {
    return (
      <>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        <div className="hero-list-status">
          <p>Nenhum herói encontrado.</p>
          <button
            className="create-hero-btn"
            onClick={() => setShowCreate(true)}
          >
            + Novo Herói
          </button>
          {showCreate && (
            <CreateHeroModal
              onSave={handleCreate}
              onCancel={() => setShowCreate(false)}
              loading={actionLoading}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <section className="hero-list-page">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {(loading || actionLoading) && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}
      <div className="hero-list-header">
        <div className="hero-list-header-left">
          <h2>Heróis</h2>
          <span className="hero-count">{meta.total} heróis cadastrados</span>
        </div>
        <input
          type="text"
          className="hero-search-input"
          placeholder="Buscar por nome ou nome de guerra..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="create-hero-btn" onClick={() => setShowCreate(true)}>
          + Novo Herói
        </button>
      </div>

      <div className="hero-grid">
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            onClick={setDetailHero}
            onEdit={setEditHero}
            onDelete={setDeleteTarget}
            onActivate={setActivateTarget}
          />
        ))}
      </div>

      <Pagination meta={meta} onPageChange={goToPage} />

      {detailHero && (
        <HeroDetailModal
          hero={detailHero}
          onClose={() => setDetailHero(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Excluir Herói"
          message={`Tem certeza que deseja excluir "${deleteTarget.nickname}"? Esta ação não pode ser desfeita.`}
          confirmLabel="Excluir"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={actionLoading}
        />
      )}

      {activateTarget && (
        <ConfirmModal
          title="Ativar Herói"
          message={`Deseja reativar "${activateTarget.nickname}"?`}
          confirmLabel="Ativar"
          variant="success"
          onConfirm={handleActivate}
          onCancel={() => setActivateTarget(null)}
          loading={actionLoading}
        />
      )}

      {editHero && (
        <EditHeroModal
          hero={editHero}
          onSave={handleEditSave}
          onCancel={() => setEditHero(null)}
          loading={actionLoading}
        />
      )}

      {showCreate && (
        <CreateHeroModal
          onSave={handleCreate}
          onCancel={() => setShowCreate(false)}
          loading={actionLoading}
        />
      )}
    </section>
  );
}
