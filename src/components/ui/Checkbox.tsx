import { type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;

}


export const Checkbox = ({ label, error, id, ...props }: CheckboxProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div>
        <input
          id={id}
          className="w-4 h-4 cursor-pointer"
          type="checkbox"
          {...props}
        />
        <label
          className={`text-sm cursor-pointer ml-1`}
          htmlFor={id}
        >
          {label}
        </label>
      </div>

      <div>
        {error && (
          <small className='text-sm text-red-500'>{error}</small>
        )}
      </div>
    </div>
  )
}

