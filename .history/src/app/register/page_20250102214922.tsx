// app/register/page.tsx
'use client';

import CenteredForm from '../components/CenteredForm';
import RegisterForm from './Form';

export default function Register() {
  return (
    <div className=''>
    <CenteredForm>

    <RegisterForm />
    </CenteredForm>
    </div>
  );
}
