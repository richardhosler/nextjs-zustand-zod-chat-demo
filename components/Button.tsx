import { ButtonHTMLAttributes, JSX } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
}

export function Button({ children, ...props }: IButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="bg-gray-600 text-white px-5 py-3 rounded-full hover:bg-slate-500"
      {...props}
    >
      {children}
    </button>
  );
}
