// MyInput.tsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface MyInputProps {
  name: string;
  placeholder?: string;
  type?: string;
}

const MyInput: React.FC<MyInputProps> = ({ name, placeholder, type = 'text' }) => {
  return (
    <div className='mt-4'>
      <Field className='rounded-lg bg-transparent p-2 border border-gray-400' name={name} type={type} placeholder={placeholder} on />
      <ErrorMessage name={name} component="div" className="text-red-800 text-xs" />
    </div>
  );
};

export default MyInput;
