// MyForm.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // For validation
import InputField from "../components/InputField";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const router = useRouter();
  const { data: session, status } = useSession(); // Get session data
  console.log(session, status);

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });

    if (response.ok) {
      router.push("/login"); // Redirect to login page after successful registration
    } else {
      const errorData = await response.json();
      alert(errorData.message); // Show error message to the user
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
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
