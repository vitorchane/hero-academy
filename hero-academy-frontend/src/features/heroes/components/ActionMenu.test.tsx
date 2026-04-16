import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionMenu } from "./ActionMenu";

describe("ActionMenu", () => {
  it("deve renderizar o botão trigger", () => {
    render(<ActionMenu />);

    expect(screen.getByText("⋮")).toBeInTheDocument();
  });

  it("deve abrir o dropdown ao clicar no trigger", () => {
    render(<ActionMenu onEdit={vi.fn()} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByText("⋮"));

    expect(screen.getByText("✏️ Editar")).toBeInTheDocument();
    expect(screen.getByText("🗑️ Excluir")).toBeInTheDocument();
  });

  it("deve mostrar botão Ativar quando onActivate é fornecido", () => {
    render(<ActionMenu onActivate={vi.fn()} />);

    fireEvent.click(screen.getByText("⋮"));

    expect(screen.getByText("✅ Ativar")).toBeInTheDocument();
  });

  it("deve chamar onEdit e fechar menu ao clicar em Editar", () => {
    const onEdit = vi.fn();
    render(<ActionMenu onEdit={onEdit} />);

    fireEvent.click(screen.getByText("⋮"));
    fireEvent.click(screen.getByText("✏️ Editar"));

    expect(onEdit).toHaveBeenCalled();
    expect(screen.queryByText("✏️ Editar")).not.toBeInTheDocument();
  });

  it("deve chamar onDelete ao clicar em Excluir", () => {
    const onDelete = vi.fn();
    render(<ActionMenu onDelete={onDelete} />);

    fireEvent.click(screen.getByText("⋮"));
    fireEvent.click(screen.getByText("🗑️ Excluir"));

    expect(onDelete).toHaveBeenCalled();
  });

  it("não deve mostrar opções quando não fornecidas", () => {
    render(<ActionMenu />);

    fireEvent.click(screen.getByText("⋮"));

    expect(screen.queryByText("✏️ Editar")).not.toBeInTheDocument();
    expect(screen.queryByText("🗑️ Excluir")).not.toBeInTheDocument();
    expect(screen.queryByText("✅ Ativar")).not.toBeInTheDocument();
  });
});
