import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const Button = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      // O segredo está aqui: usamos o template literal para trocar as classes
      className={`font-bold py-2 rounded-lg transition-all shadow-md active:scale-95 w-full ${
        disabled
          ? "bg-gray-400 cursor-not-allowed text-gray-200" // Cor quando carregando
          : "bg-slate-600 text-white hover:bg-slate-800" // Cor normal
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
