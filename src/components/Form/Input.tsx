import React from 'react';

interface InputProps {
  type: 'text' | 'number' | 'checkbox' | 'radio' | 'password' | 'email' | 'date';
   
  label: string;
  id?: string;
  name?: string; // Make name optional
  value: string | number;
  required?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error prop
}

const Input: React.FC<InputProps> = ({ type, label, id, name, value, onChange, error, required, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name} // name is now optional, can be omitted if not required
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>} {/* Show error message if it exists */}
    </div>
  );
};

export default Input;
