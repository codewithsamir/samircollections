import React from 'react';

interface InputProps {
  type: string;
  label: string;
  id: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, label, id, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default Input;
