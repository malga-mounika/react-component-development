
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
  isPassword?: boolean;
  isClearable?: boolean;
}

/**
 * A flexible and customizable InputField component.
 * It supports different variants, sizes, and states like disabled, invalid, and loading.
 * @param {InputFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered InputField component.
 */
const InputField: React.FC<InputFieldProps> = ({
  value: controlledValue,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  isPassword = false,
  isClearable = false,
}) => {
  // Use state for the input value and the password visibility
  const [value, setValue] = useState(controlledValue || '');
  const [showPassword, setShowPassword] = useState(false);

  // Handle value changes for controlled and uncontrolled components
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  // Handle clearing the input field
  const handleClear = () => {
    setValue('');
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Define base and conditional classes using Tailwind CSS
  const baseClasses = 'w-full rounded-lg transition-all duration-200 focus:outline-none';

  // Variant-based styles
  const variantClasses = {
    outlined: `bg-white dark:bg-gray-800 border-2 border-gray-300 focus:border-blue-500 ${invalid ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100' : ''}`,
    filled: `bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 ${invalid ? 'border-red-500' : ''} ${disabled ? 'bg-gray-200 dark:bg-gray-800' : ''}`,
    ghost: `bg-transparent dark:bg-transparent border-2 border-transparent focus:border-blue-500 ${invalid ? 'border-red-500' : ''} ${disabled ? 'bg-gray-50 dark:bg-gray-800' : ''}`,
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
    disabled ? 'text-gray-400 cursor-not-allowed' : '',
    isPassword || isClearable ? 'pr-10' : '' // Add padding for icons
  );

  return (
    <div className="flex flex-col mb-4 font-inter">
      {/* Label */}
      {label && (
        <label className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Input Field and Optional features wrapper */}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          className={finalInputClasses}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
        />

        {/* Clear and Password Toggle Buttons */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-3 space-x-2">
          {isClearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
              disabled={disabled}
              aria-label="Clear input"
            >
              &times; {/* Using a simple multiplication symbol for the clear icon */}
            </button>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
              disabled={disabled}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🙈' : '👁️'} {/* Using emojis for the password toggle icons */}
            </button>
          )}
        </div>
      </div>

      {/* Helper and Error Text */}
      {invalid && errorMessage ? (
        <p className="text-sm text-red-500 mt-1 dark:text-red-400">{errorMessage}</p>
      ) : (
        helperText && (
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{helperText}</p>
        )
      )}
    </div>
  );
};

// This is the metadata for your component, defining its title and component
const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    isPassword: {
      control: 'boolean',
      description: 'Enables a password toggle button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isClearable: {
      control: 'boolean',
      description: 'Enables a button to clear the input value.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

// This defines the type for your stories
type Story = StoryObj<typeof InputField>;

/**
 * The default story for the InputField component.
 * This showcases the basic appearance and functionality with a label and placeholder.
 */
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email.',
  },
};

/**
 * A story showing the 'filled' variant of the input field.
 */
export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
};

/**
 * A story showing the 'ghost' variant of the input field.
 */
export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

/**
 * A story demonstrating the input field in an invalid state with an error message.
 */
export const Invalid: Story = {
  args: {
    ...Default.args,
    invalid: true,
    errorMessage: 'Please enter a valid email address.',
    helperText: undefined, // Hide helper text when there's an error
  },
};

/**
 * A story showing the disabled state. The input field cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

/**
 * A story demonstrating the password toggle feature.
 */
export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters long.',
    isPassword: true,
  },
};

/**
 * A story demonstrating the clearable input feature.
 */
export const ClearableInput: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    isClearable: true,
    value: 'Initial value',
  },
};

/**
 * A story showing the dark theme for the default variant.
 * Note: To see this in action, you need to add `class="dark"` to a parent element in Storybook's preview.
 */
export const DarkTheme: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [{ name: 'Dark', value: '#1a202c' }],
    },
  },
};

/**
 * A story showing the filled variant in dark theme.
 */
export const DarkThemeFilled: Story = {
  args: {
    ...Filled.args,
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [{ name: 'Dark', value: '#1a202c' }],
    },
  },
};

/**
 * A story showing the ghost variant in dark theme.
 */
export const DarkThemeGhost: Story = {
  args: {
    ...Ghost.args,
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [{ name: 'Dark', value: '#1a202c' }],
    },
  },
};
