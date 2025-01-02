// MyInput.tsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface MyInputProps {
  name: string;
  placeholder?: string;
  type?: string;
  onchange?: any;
  className?: any
}

const MyInput: React.FC<MyInputProps> = ({ name, placeholder,className, onchange, type = 'text' }) => {
  return (
    <div  className={className}>
      <Field className='rounded-lg bg-transparent p-2 border border-gray-400 my-2' name={name} type={type} placeholder={placeholder}  />
      <ErrorMessage name={name} component="div" className="text-red-800 text-xs" />
    </div>
  );
};

export default MyInput;
