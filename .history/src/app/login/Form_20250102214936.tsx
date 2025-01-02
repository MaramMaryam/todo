// MyForm.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // For validation
import InputField from "../components/InputField";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required"),
  });

  const router = useRouter();
  const { data: session, status } = useSession(); // Get session data
  console.log(session, status);
  //   if (status === 'loading') return; // Wait for loading state
  useEffect(() => {
    if (session) {
      redirect("/todos"); // Redirect to login if not authenticated
    }
    router.push("/login");
  }, [session, status, router]);

  const handleSubmit = async (values: typeof initialValues) => {
    // e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      alert(result.error); // Handle login error
    } else {
      router.push("/todos"); // Redirect to dashboard after successful login
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <InputField name="email" placeholder="Email" type="email" />
        <InputField name="password" placeholder="Password" type="password" />
        <button
          className="bg-slate-800 w-full border px-5 py-2 rounded-lg my-8 text-green-400 text-lg font-semibold"
          type="submit"
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
