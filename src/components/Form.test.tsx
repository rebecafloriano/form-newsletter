import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Form from "./Form";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Teste Renderização", () => {
  it("Deve renderizar os subcomponentes input, checkbox e button corretamente", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });

    expect(nameInputElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(termosCheckboxElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("Deve renderizar o botão de acessibilidade do footer", () => {
    render(<Form />);

    const buttonLinkAccessibility = screen.getByRole("button", {
      name: /acessibilidade/i,
    });
    expect(buttonLinkAccessibility).toBeInTheDocument();
  });

  it("Deve renderizar o modal de texto para Feedback do footer ao clicar no link", () => {
    render(<Form />);

    const buttonLinkAccessibility = screen.getByRole("button", {
      name: /acessibilidade/i,
    });
    fireEvent.click(buttonLinkAccessibility);

    const textArea = screen.getByPlaceholderText(
      /Ex: Não consigo usar o teclado/i,
    );
    const sendButton = screen.getByRole("button", { name: /enviar/i });
    const cancelButton = screen.getByRole("button", { name: /cancelar/i });

    expect(textArea).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("Deve fechar o formulario de feedback(footer) quando o botao cancelar é clicado.", () => {
    render(<Form />);

    const buttonLinkAccessibility = screen.getByRole("button", {
      name: /acessibilidade/i,
    });
    fireEvent.click(buttonLinkAccessibility);

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);
    expect(
      screen.queryByPlaceholderText(/Ex: Não consigo usar o teclado/i),
    ).not.toBeInTheDocument();
  });

  it("Deve permitir enviar um feedback a partir da tela de sucesso do formulário", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<Form />);

    const nameInput = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInput = screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const checkbox = screen.getByLabelText(/Concordo com os termos/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "Rebeca" } });
    fireEvent.change(emailInput, { target: { value: "rebeca@gmail.com" } });
    fireEvent.click(checkbox);
    fireEvent.click(registerButton);

    const successMessage = await screen.findByText(/sucesso/i);
    expect(successMessage).toBeInTheDocument();

    const textArea = screen.getByPlaceholderText(
      /Ex: Problemas na navegação por teclado/i,
    );
    fireEvent.change(textArea, {
      target: { value: "Encontrei problemas com leitor do ecrã" },
    });

    const feedbackSendButton = screen.getByRole("button", {
      name: /enviar feedback/i,
    });
    fireEvent.click(feedbackSendButton);

    const successGreatfullMessage = await screen.findByText(
      /A sua opinião ajuda-nos a melhorar/i,
    );
    expect(successGreatfullMessage).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: /voltar/i });
    expect(backButton).toBeInTheDocument();

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});

describe("Validação dos campos e botao", () => {
  it("Botão enviar deve estar bloqueado caso os campos estão em branco", () => {
    render(<Form />);
    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });
    expect(buttonElement).toBeDisabled();
  });

  it("Falta email e os termos, apenas nome preenchido", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);

    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });
    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });

    expect(buttonElement).toBeDisabled();
  });

  it("Falta aceitar os termos. Nome e email preenchidos", () => {
    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });

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
    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });

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
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });
    fireEvent.change(emailInputElement, {
      target: { value: "rebeca@gmail.com" },
    });
    fireEvent.click(termosCheckboxElement);

    fireEvent.click(buttonElement);

    const successMessage = await screen.findByText(/sucesso/i);
    expect(successMessage).toBeInTheDocument();

    const personalizedMessage = screen.getByText(
      /Rebeca, o seu cadastro foi realizado com êxito/i,
    );
    expect(personalizedMessage).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("Deve aparecer mensagem de agradecimento ao submeter o feedback do rodapé", async () => {
    //Mock da resposta positiva da API
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<Form />);

    const buttonLinkAccessibility = screen.getByRole("button", {
      name: /acessibilidade/i,
    });
    fireEvent.click(buttonLinkAccessibility);

    const textArea = screen.getByPlaceholderText(
      /Ex: Não consigo usar o teclado/i,
    );
    fireEvent.change(textArea, {
      target: { value: "Tive problemas com a navegação pelo teclado" },
    });
    const sendButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(sendButton);

    const greatfullMessage = await screen.findByText(
      /o seu comentário foi enviado diretamente/i,
    );
    expect(greatfullMessage).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});

describe("Fluxo de Erro com API", () => {
  it("Deve mostrar mensagem de erro se a requisição da API falhar", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("Network Error"));

    render(<Form />);

    const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i);
    const emailInputElement =
      screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const termosCheckboxElement = screen.getByLabelText(
      /Concordo com os termos/i,
    );
    const buttonElement = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInputElement, { target: { value: "Rebeca" } });
    fireEvent.change(emailInputElement, {
      target: { value: "rebeca@gmail.com" },
    });
    fireEvent.click(termosCheckboxElement);

    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText(/falha na rede/i);

    expect(errorMessage).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
