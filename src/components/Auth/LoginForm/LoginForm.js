import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";
import "./LoginForm.scss";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const result = await login({
          variables: {
            input: values,
          },
        });
        const { token } = result.data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
      }
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>¡Entra para conectarte con tus amigos!</h2>
      <Form.Input
        error={formik.errors.email}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.email}
        placeholder="Correo electrónico"
        name="email"
      />
      <Form.Input
        error={formik.errors.password}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
        placeholder="Contraseña"
        name="password"
      />

      <Button type="submit" className="btn-submit">
        Iniciar Sesión
      </Button>
      {error && <p className="submit-error">{error}</p>}
    </Form>
  );
};

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export default LoginForm;
