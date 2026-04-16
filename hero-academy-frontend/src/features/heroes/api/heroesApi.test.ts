import { beforeEach, describe, expect, it, vi } from "vitest";
import { createHero, deleteHero, fetchHeroes, updateHero } from "./heroesApi";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  globalThis.fetch = mockFetch;
});

describe("heroesApi", () => {
  describe("fetchHeroes", () => {
    it("deve buscar heróis com parâmetros padrão", async () => {
      const mockResponse = {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchHeroes();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/heroes?page=1&limit=10"),
      );
      expect(result).toEqual(mockResponse);
    });

    it("deve incluir parâmetro de busca quando fornecido", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: [], meta: {} }),
      });

      await fetchHeroes(1, 10, "spider");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("search=spider"),
      );
    });

    it("deve lançar erro quando resposta não é ok", async () => {
      mockFetch.mockResolvedValue({ ok: false });

      await expect(fetchHeroes()).rejects.toThrow("Erro ao buscar heróis");
    });
  });

  describe("deleteHero", () => {
    it("deve chamar endpoint DELETE", async () => {
      mockFetch.mockResolvedValue({ ok: true });

      await deleteHero("123");

      expect(mockFetch).toHaveBeenCalledWith("/api/v1/heroes/123", {
        method: "DELETE",
      });
    });

    it("deve lançar erro em falha", async () => {
      mockFetch.mockResolvedValue({ ok: false });

      await expect(deleteHero("123")).rejects.toThrow("Erro ao excluir herói");
    });
  });

  describe("updateHero", () => {
    it("deve chamar endpoint PATCH com dados", async () => {
      const updated = { id: "123", name: "Updated" };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(updated),
      });

      const result = await updateHero("123", { name: "Updated" } as any);

      expect(mockFetch).toHaveBeenCalledWith("/api/v1/heroes/123", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Updated" }),
      });
      expect(result).toEqual(updated);
    });

    it("deve lançar erro em falha", async () => {
      mockFetch.mockResolvedValue({ ok: false });

      await expect(updateHero("123", {} as any)).rejects.toThrow(
        "Erro ao atualizar herói",
      );
    });
  });

  describe("createHero", () => {
    it("deve chamar endpoint POST com dados", async () => {
      const hero = { name: "Test" };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(hero),
      });

      const data = {
        name: "Test",
        nickname: "T",
        date_of_birth: "2000-01-01",
        universe: "MARVEL",
        main_power: "SUPER_FORCA",
        avatar_url: "http://example.com/img.png",
        is_active: true,
      } as any;

      await createHero(data);

      expect(mockFetch).toHaveBeenCalledWith("/api/v1/heroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    });

    it("deve lançar erro em falha", async () => {
      mockFetch.mockResolvedValue({ ok: false });

      await expect(createHero({} as any)).rejects.toThrow(
        "Erro ao criar herói",
      );
    });
  });
});
