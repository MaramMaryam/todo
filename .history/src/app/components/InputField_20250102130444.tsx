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
    <div>
      <Field name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" ={{ color: 'red' }} />
    </div>
  );
};

export default MyInput;
