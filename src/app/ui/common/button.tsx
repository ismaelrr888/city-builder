import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "flex gap-2 border rounded bg-white py-2 px-4 border-gray-300",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
