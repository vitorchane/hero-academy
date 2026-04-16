import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("não deve renderizar quando totalPages <= 1", () => {
    const { container } = render(
      <Pagination
        meta={{ total: 5, page: 1, limit: 10, totalPages: 1 }}
        onPageChange={vi.fn()}
      />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("deve renderizar botões de página", () => {
    render(
      <Pagination
        meta={{ total: 25, page: 1, limit: 10, totalPages: 3 }}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("deve desabilitar botão anterior na primeira página", () => {
    render(
      <Pagination
        meta={{ total: 20, page: 1, limit: 10, totalPages: 2 }}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("← Anterior")).toBeDisabled();
  });

  it("deve desabilitar botão próximo na última página", () => {
    render(
      <Pagination
        meta={{ total: 20, page: 2, limit: 10, totalPages: 2 }}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Próximo →")).toBeDisabled();
  });

  it("deve chamar onPageChange ao clicar em um botão de página", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        meta={{ total: 20, page: 1, limit: 10, totalPages: 2 }}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("deve chamar onPageChange ao clicar em Próximo", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        meta={{ total: 30, page: 1, limit: 10, totalPages: 3 }}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("Próximo →"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
