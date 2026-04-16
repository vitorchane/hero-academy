import { useState } from "react";
import { createHero, deleteHero, updateHero } from "../api/heroesApi";
import type { Hero } from "../types/hero";

interface UseHeroActionsParams {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  refresh: () => void;
}

export function useHeroActions({
  onSuccess,
  onError,
  refresh,
}: UseHeroActionsParams) {
  const [showCreate, setShowCreate] = useState(false);
  const [detailHero, setDetailHero] = useState<Hero | null>(null);
  const [editHero, setEditHero] = useState<Hero | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Hero | null>(null);
  const [activateTarget, setActivateTarget] = useState<Hero | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await deleteHero(deleteTarget.id);
      setDeleteTarget(null);
      onSuccess(`"${deleteTarget.nickname}" foi excluído com sucesso.`);
      refresh();
    } catch {
      onError("Erro ao excluir herói. Tente novamente.");
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
      onSuccess(`"${activateTarget.nickname}" foi reativado com sucesso.`);
      refresh();
    } catch {
      onError("Erro ao ativar herói. Tente novamente.");
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
      onSuccess(`"${editHero.nickname}" foi atualizado com sucesso.`);
      refresh();
    } catch {
      onError("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreate = async (data: Parameters<typeof createHero>[0]) => {
    setActionLoading(true);
    try {
      await createHero(data);
      setShowCreate(false);
      onSuccess("Herói criado com sucesso!");
      refresh();
    } catch {
      onError("Erro ao criar herói. Tente novamente.");
    } finally {
      setActionLoading(false);
    }
  };

  return {
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
  };
}
