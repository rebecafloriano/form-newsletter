import { describe, it, expect } from "vitest";
import { validate } from "./validate";
import type { User } from "../types/User";

describe("Função de Validação - validate.ts", () => {
  it("Deve mostrar mensagem de erro caso o formato do e-mail seja inválido", () => {
    const invalidDatas: User = {
      name: "Rebeca",
      email: "rebeca@gmailcom",
      agree: true,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.email).toBe("Formato de e-mail inválido!");
  });

  it("Deve mostrar mensagem de erro caso os termos nao tenha sido aceitos", () => {
    const invalidDatas: User = {
      name: "Rebeca",
      email: "rebeca@gmail.com",
      agree: false,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.agree).toBe("É obrigatório concordar com os Termos");
  });

  it("Deve mostrar mensagem de erro caso o nome tenha menos que 3 caracteres", () => {
    const invalidDatas: User = {
      name: "Re",
      email: "rebeca@gmail.com",
      agree: true,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.name).toBe("O nome deve ter pelo menos 3 caracteres!");
  });

  it("Se submeter o formulario com o nome em branco deve aparecer uma mensagem de aviso de obrigatoriedade", () => {
    const invalidDatas: User = {
      name: "",
      email: "rebeca@gmail.com",
      agree: true,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.name).toBe("O nome é obrigatório!");
  });

  it("Se submeter o formulario com o email em branco deve aparecer uma mensagem de aviso de obrigatoriedade", () => {
    const invalidDatas: User = {
      name: "Rebeca",
      email: "",
      agree: true,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.email).toBe("O email é obrigatório!");
  });

  it("Se submeter o formulario com o nome apenas com espaços deve aparecer uma mensagem de aviso de obrigatoriedade", () => {
    const invalidDatas: User = {
      name: "  ",
      email: "rebeca@gmail.com",
      agree: true,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.name).toBe("O nome é obrigatório!");
  });

  it("Se submeter o formulario com o email apenas com espaços deve aparecer uma mensagem de aviso de obrigatoriedade", () => {
    const invalidDatas: User = {
      name: "Rebeca",
      email: "   ",
      agree: true,
    };

    const resolved = validate(invalidDatas);

    expect(resolved.email).toBe("O email é obrigatório!");
  });
});
