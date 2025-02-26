import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const variantClasses = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-neutral-500 text-white hover:bg-neutral-600",
  outline: "border border-primary-500 text-primary-500 hover:bg-primary-100",
  gradient: "bg-gradient-to-r from-blue-500 to-green-500 text-white",
};

const sizeClasses = {
  small: "px-3 py-1 text-sm",
  medium: "px-5 py-2 text-base",
  large: "px-7 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
}) => {
  return (
    <button
      className={`rounded ${variantClasses[variant]} ${sizeClasses[size]} transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;