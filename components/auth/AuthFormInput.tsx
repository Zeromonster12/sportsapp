import React from "react";

interface AuthFormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  helpText?: string;
}

export function AuthFormInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  helpText,
}: AuthFormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-300 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        placeholder={placeholder}
      />
      {helpText && <p className="mt-1 text-xs text-zinc-500">{helpText}</p>}
    </div>
  );
}
