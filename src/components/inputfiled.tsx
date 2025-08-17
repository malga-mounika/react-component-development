
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Define the component's props based on your assignment brief
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A flexible and customizable InputField component.
 * It supports different variants, sizes, and states like disabled, invalid, and loading.
 * The component also includes optional features like a clear button and password toggle.
 * * @param {InputFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered InputField component.
 */
const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
}) => {
  // State for optional features like password visibility and clear button value
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Define base and conditional classes using Tailwind CSS
  const baseClasses = 'w-full rounded-lg transition-all duration-200 focus:outline-none';

  // Variant-based styles
  const variantClasses = {
    outlined: `bg-white border-2 border-gray-300 focus:border-blue-500 ${invalid ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100' : ''}`,
    filled: `bg-gray-100 border-2 border-transparent focus:border-blue-500 ${invalid ? 'border-red-500' : ''} ${disabled ? 'bg-gray-200' : ''}`,
    ghost: `bg-transparent border-2 border-transparent focus:border-blue-500 ${invalid ? 'border-red-500' : ''} ${disabled ? 'bg-gray-50' : ''}`,
  };

  // Size-based padding and font styles
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  const finalInputClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    invalid ? 'text-red-500 border-red-500' : '',
    disabled ? 'text-gray-400 cursor-not-allowed' : ''
  );

  return (
    <div className="flex flex-col mb-4 font-inter">
      {/* Label */}
      {label && (
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          {label}
        </label>
      )}

      {/* Input Field and Optional features wrapper */}
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : 'password'} // Dynamic type for password toggle
          className={finalInputClasses}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />

        {/* Optional Password Toggle */}
        {label?.toLowerCase().includes('password') && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              // Lucide icon for eye-off
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6 18a10.43 10.43 0 0 1-1.67-2.68S2 12 2 12a13.16 13.16 0 0 1 1.67-2.68"/><path d="M16.73 16.92A10.43 10.43 0 0 1 12 19c-7 0-10-7-10-7a13.16 13.16 0 0 1 1.67-2.68"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            ) : (
              // Lucide icon for eye
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        )}
      </div>

      {/* Helper and Error Text */}
      {invalid && errorMessage ? (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      ) : (
        helperText && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )
      )}
    </div>
  );
};

export default InputField;
