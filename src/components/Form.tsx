import { useState, type BaseSyntheticEvent } from "react";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";
import type { User } from "../types/User";
import { validate } from "../utils/validate";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [apiError, setApiError] = useState<string | null>(null);

  // Estados partilhados para o Loop de Feedback (Rodapé e Sucesso)
  const [showFooterFeedback, setShowFooterFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setErrors(null);
    setApiError(null);

    const data: User = { name, email, agree };
    const validateErrors = validate(data);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setIsLoading(true);
    try {
      const formData = {
        access_key: "f12668c6-2429-498e-aebd-bc8bdb70338c",
        name: data.name,
        email: data.email,
        subject: "Nova Subscrição na Newsletter",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        setApiError(result.message || "Erro ao submeter o formulário.");
      }
    } catch {
      setApiError("Falha na rede. Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // FUNÇÃO DE ENVIO DE FEEDBACK
  const handleFeedbackSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = {
        access_key: "f12668c6-2429-498e-aebd-bc8bdb70338c",
        subject: isSuccess
          ? "Feedback pós-sucesso (Newsletter)"
          : "Feedback pré-submissão/Bug (Newsletter)",
        message: `Feedback enviado por ${name || "Utilizador Anónimo"}: ${feedbackText}`,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setFeedbackSuccess(true);
      }
    } catch {
      console.error("Erro ao enviar feedback.");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setAgree(false);
    setErrors(null);
    setApiError(null);
    setIsSuccess(false);
    setFeedbackText("");
    setFeedbackSuccess(false);
    setShowFooterFeedback(false);
  };

  //ECRÃ DE SUCESSO (COM FEEDBACK EMBUTIDO)
  if (isSuccess) {
    return (
      <div
        className="text-center p-8 bg-green-50 rounded-lg border border-green-200"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-2xl font-bold text-green-700">🎉 Sucesso!</h2>
        <p className="text-green-600">
          {name}, o seu cadastro foi realizado com êxito.
        </p>

        <div className="border-t border-green-200 pt-6 mt-6 max-w-sm mx-auto">
          {feedbackSuccess ? (
            <p className="text-sm font-medium text-green-800 bg-green-100 p-2 rounded">
              Obrigado! A sua opinião ajuda-nos a melhorar a experiência de
              todos.
            </p>
          ) : (
            <form
              onSubmit={handleFeedbackSubmit}
              className="flex flex-col gap-2"
            >
              <label
                htmlFor="success-feedback-text"
                className="text-xs text-gray-600 font-medium text-left block"
              >
                Encontrou alguma barreira de acessibilidade ou bug? Deixe o seu
                comentário:
              </label>
              <textarea
                id="success-feedback-text"
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Ex: Problemas na navegação por teclado, contraste, comportamento do leitor de ecrã..."
                className="w-full text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-gray-800"
                rows={3}
              />
              <button
                type="submit"
                className="w-full text-xs bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded transition font-medium focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer"
              >
                Enviar Feedback
              </button>
            </form>
          )}
        </div>

        <button
          onClick={handleReset}
          className="mt-6 text-sm underline text-gray-500 hover:text-gray-700 block mx-auto"
        >
          Voltar
        </button>
      </div>
    );
  }

  const isFormInvalid = !name.trim() || !email.trim() || !agree;

  //FORMULÁRIO PRINCIPAL + FEEDBACK NO RODAPÉ
  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Nome"
          placeholder="Escreva seu nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors?.name}
        />

        <Input
          id="email"
          label="Email"
          placeholder="exemplo@exemplo.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.email}
        />

        <div className="flex flex-col gap-2 py-2">
          <a
            className="text-xs underline text-blue-800 hover:text-blue-950"
            href="#"
          >
            Leia os termos
          </a>

          <Checkbox
            id="agree"
            label="Concordo com os termos"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            error={errors?.agree ? String(errors.agree) : undefined}
          />
        </div>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {apiError}
          </div>
        )}

        {isFormInvalid && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded text-center">
            Preencha todos os campos e aceite os termos para ativar o cadastro.
          </p>
        )}

        <Button type="submit" disabled={isLoading || isFormInvalid}>
          {isLoading ? "Enviando..." : "Cadastrar"}
        </Button>
      </form>

      {/* LINK DE FEEDBACK DE SEGURANÇA NO RODAPÉ */}
      <div className="border-t border-gray-200 pt-4 text-center">
        {!showFooterFeedback ? (
          <button
            onClick={() => setShowFooterFeedback(true)}
            className="text-xs text-gray-700 hover:text-gray-900 underline focus:outline-none focus:ring-1 focus:ring-gray-400 p-1 rounded"
          >
            Encontrou algum problema ou barreira de acessibilidade? Clique aqui.
          </button>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left">
            {feedbackSuccess ? (
              <p className="text-xs font-medium text-green-800 text-center">
                Obrigado! O seu comentário foi enviado diretamente para a nossa
                equipa de desenvolvimento.
              </p>
            ) : (
              <form
                onSubmit={handleFeedbackSubmit}
                className="flex flex-col gap-2"
              >
                <label
                  htmlFor="footer-feedback-text"
                  className="text-xs text-gray-600 font-medium"
                >
                  Relate o bug ou dificuldade técnica:
                </label>
                <textarea
                  id="footer-feedback-text"
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Ex: Não consigo usar o teclado, erro na validação, etc..."
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-gray-800"
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowFooterFeedback(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 transition"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
