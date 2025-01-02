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
    <div className='m-4 w-80'>
      <Field className='rounded-lg bg-transparent p-2' name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" className="text-red-800 text-xs" />
    </div>
  );
};

export default MyInput;
