import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ToastData } from "./Toast";
import { ToastContainer } from "./Toast";

describe("ToastContainer", () => {
  it("deve renderizar os toasts", () => {
    const toasts: ToastData[] = [
      { id: 1, message: "Sucesso!", type: "success" },
      { id: 2, message: "Erro!", type: "error" },
    ];

    render(<ToastContainer toasts={toasts} onRemove={vi.fn()} />);

    expect(screen.getByText("Sucesso!")).toBeInTheDocument();
    expect(screen.getByText("Erro!")).toBeInTheDocument();
  });

  it("deve chamar onRemove ao clicar no toast", () => {
    const onRemove = vi.fn();
    const toasts: ToastData[] = [
      { id: 1, message: "Clique aqui", type: "success" },
    ];

    render(<ToastContainer toasts={toasts} onRemove={onRemove} />);

    fireEvent.click(screen.getByText("Clique aqui"));
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("deve mostrar ícone correto para sucesso", () => {
    const toasts: ToastData[] = [{ id: 1, message: "Ok", type: "success" }];

    render(<ToastContainer toasts={toasts} onRemove={vi.fn()} />);

    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("deve mostrar ícone correto para erro", () => {
    const toasts: ToastData[] = [{ id: 1, message: "Falha", type: "error" }];

    render(<ToastContainer toasts={toasts} onRemove={vi.fn()} />);

    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  it("deve auto-remover toast após timeout", () => {
    vi.useFakeTimers();
    const onRemove = vi.fn();
    const toasts: ToastData[] = [
      { id: 1, message: "Auto remover", type: "success" },
    ];

    render(<ToastContainer toasts={toasts} onRemove={onRemove} />);

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(onRemove).toHaveBeenCalledWith(1);
    vi.useRealTimers();
  });
});
