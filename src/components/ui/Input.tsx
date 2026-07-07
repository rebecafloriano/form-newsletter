import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export const Input = ({ label, id, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        className={`bg-white p-1 w-full rounded-lg border transition-colors ${
          error ? "border-red-500 focus:outline-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <small className="text-sm text-red-500 mt-1">{error}</small>}
    </div>
  );
};
