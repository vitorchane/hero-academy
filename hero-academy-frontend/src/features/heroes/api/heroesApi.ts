import type { Hero, HeroesResponse } from "../types/hero";

const API_BASE = "/api/v1";

export async function fetchHeroes(
  page = 1,
  limit = 10,
  search?: string,
): Promise<HeroesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.set("search", search);

  const response = await fetch(`${API_BASE}/heroes?${params}`);
  if (!response.ok) throw new Error("Erro ao buscar heróis");
  return response.json();
}

export async function deleteHero(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/heroes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao excluir herói");
}

export async function updateHero(
  id: string,
  data: Partial<Hero>,
): Promise<Hero> {
  const response = await fetch(`${API_BASE}/heroes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar herói");
  return response.json();
}

export async function createHero(
  data: Omit<Hero, "id" | "created_at" | "updated_at">,
): Promise<Hero> {
  const response = await fetch(`${API_BASE}/heroes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao criar herói");
  return response.json();
}
