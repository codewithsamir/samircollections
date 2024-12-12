import React from 'react';

// Define the interface for InputProps
interface InputProps {
  type: 'text' | 'number' | 'checkbox' | 'radio' | 'password' | 'email' | 'date'; // Supported input types
  label: string; // Label text for the input
  id?: string; // Optional id for accessibility
  name?: string; // Optional name attribute
  value: string | number; // Value of the input
  required?: boolean; // If the input is required
  placeholder?: string; // Optional placeholder text
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  error?: string; // Optional error message
  disabled?: boolean; // Optional disabled state
  className?: string; // Additional custom class names for styling
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  id,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  disabled,
  className,
}) => {
  return (
    <div className={`mb-4 ${className || ''}`}> {/* Wrapper for spacing and custom styles */}
      {/* Label for the input */}
      <label 
        className="block text-gray-700 mb-2 font-medium" 
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>} {/* Mark required fields */}
      </label>

      {/* Input field */}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled} // Handle disabled state
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`} // Apply styles conditionally
      />

      {/* Error message */}
      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </div>
  );
};

export default Input;