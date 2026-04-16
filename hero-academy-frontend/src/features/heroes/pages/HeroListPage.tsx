import { ToastContainer } from "../../../components/ui/ui/Toast";
import { ConfirmModal } from "../components/ConfirmModal";
import { CreateHeroModal } from "../components/CreateHeroModal";
import { EditHeroModal } from "../components/EditHeroModal";
import { HeroCard } from "../components/HeroCard";
import { HeroDetailModal } from "../components/HeroDetailModal";
import { Pagination } from "../components/Pagination";
import { useHeroActions } from "../hooks/useHeroActions";
import { useHeroes } from "../hooks/useHeroes";
import { useToast } from "../hooks/useToast";
import "./HeroListPage.css";

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

  const { toasts, addToast, removeToast } = useToast();

  const {
    showCreate,
    setShowCreate,
    detailHero,
    setDetailHero,
    editHero,
    setEditHero,
    deleteTarget,
    setDeleteTarget,
    activateTarget,
    setActivateTarget,
    actionLoading,
    handleDelete,
    handleActivate,
    handleEditSave,
    handleCreate,
  } = useHeroActions({
    onSuccess: (msg) => addToast(msg, "success"),
    onError: (msg) => addToast(msg, "error"),
    refresh,
  });

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
