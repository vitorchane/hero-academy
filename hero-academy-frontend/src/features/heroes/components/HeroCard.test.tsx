import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Hero } from "../types/hero";
import { HeroCard } from "./HeroCard";

const mockHero: Hero = {
  id: "1",
  name: "Peter Parker",
  nickname: "Homem-Aranha",
  date_of_birth: "2001-08-10",
  universe: "MARVEL",
  main_power: "LANCAMENTO_DE_TEIAS",
  avatar_url: "https://example.com/spider.png",
  is_active: true,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

describe("HeroCard", () => {
  it("deve renderizar o avatar do herói", () => {
    render(
      <HeroCard
        hero={mockHero}
        onClick={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onActivate={vi.fn()}
      />,
    );

    expect(screen.getByAltText("Homem-Aranha")).toBeInTheDocument();
  });

  it("deve chamar onClick ao clicar no card", () => {
    const onClick = vi.fn();
    render(
      <HeroCard
        hero={mockHero}
        onClick={onClick}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onActivate={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByAltText("Homem-Aranha"));
    expect(onClick).toHaveBeenCalledWith(mockHero);
  });

  it("deve mostrar badge 'Inativo' para herói inativo", () => {
    const inactive = { ...mockHero, is_active: false };
    render(
      <HeroCard
        hero={inactive}
        onClick={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onActivate={vi.fn()}
      />,
    );

    expect(screen.getByText("Inativo")).toBeInTheDocument();
  });

  it("não deve mostrar badge 'Inativo' para herói ativo", () => {
    render(
      <HeroCard
        hero={mockHero}
        onClick={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onActivate={vi.fn()}
      />,
    );

    expect(screen.queryByText("Inativo")).not.toBeInTheDocument();
  });
});
