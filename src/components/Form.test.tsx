import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Form from "./Form";

describe("Teste Renderização", () => {
  it("Deve renderizar os subcomponentes input, checkbox e button corretamente", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button");

    expect(nameInputElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(termosCheckboxElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("Validação dos campos e botao", () => {
  it("Botão enviar deve estar bloqueado caso os campos estão em branco", () => {
    render(<Form />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  it("Falta email e os termos, apenas nome preenchido", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);

    const buttonElement = screen.getByRole("button");
    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });

    expect(buttonElement).toBeDisabled();
  });

  it("Falta aceitar os termos. Nome e email preenchidos", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const buttonElement = screen.getByRole("button");

    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });
    fireEvent.change(emailInputElement, {
      target: { value: "rebeca@gmail.com" },
    });

    expect(buttonElement).toBeDisabled();
  });

  it("Tudo preenchido, o botao deve ficar disponível", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button");

    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });
    fireEvent.change(emailInputElement, {
      target: { value: "rebeca@gmail.com" },
    });
    fireEvent.click(termosCheckboxElement);

    expect(buttonElement).not.toBeDisabled();
  });
});

describe("Fluxo de Sucesso com API", () => {
  it("Deve mostrar mensagem de sucesso ao submeter com dados válido", async () => {
    //fetch falso
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button");

    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });
    fireEvent.change(emailInputElement, {
      target: { value: "rebeca@gmail.com" },
    });
    fireEvent.click(termosCheckboxElement);

    fireEvent.click(buttonElement);

    const successMessage = await screen.findByText(/sucesso/i);
    expect(successMessage).toBeInTheDocument();

    const personalizedMessage = screen.getByText(
      /Rebeca, seu cadastro foi realizado com êxito/i,
    );
    expect(personalizedMessage).toBeInTheDocument();
  });
});

describe("Fluxo de Erro com API", () => {
  it("Deve mostrar mensagem de erro se a requisição da API falhar", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button");

    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });
    fireEvent.change(emailInputElement, {
      target: { value: "rebeca@gmail.com" },
    });
    fireEvent.click(termosCheckboxElement);

    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText(/falha na rede/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
