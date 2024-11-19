import { JSX, TextareaHTMLAttributes, forwardRef } from "react";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref): JSX.Element => (
    <textarea
      ref={ref}
      {...props}
      className={`flex-1 px-5 py-3 rounded-full bg-gray-200 focus:outline-none text-gray-900 resize-none h-12 ${String(props.className)}`}
    />
  )
);
