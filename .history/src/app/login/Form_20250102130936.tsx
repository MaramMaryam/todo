// MyForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // For validation
import InputField from '../components/InputField';

const LoginForm: React.FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

//   const handleSubmit = (values: typeof initialValues) => {
//     console.log('Form data', values);
//     // Handle form submission (e.g., API call)
//   };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <InputField name="email" placeholder="Email" type="email" />
        <InputField name="password" placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
