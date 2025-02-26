import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  type?: "text" | "email" | "password";
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  type = "text",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-primary-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
