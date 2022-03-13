import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import "./RegisterForm.scss";

function RegisterForm({ setShowLogin }) {
  const formik = useFormik({
    initialValues: initialFormValue(),
    validationSchema: null,
    onSubmit: (values) => {
      console.log("Holaa ");
      console.log(values);
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Registrate para ver fotos y videos de tus amigos.
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Nombre y Apellido"
          name="name"
        />
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Nombre de usuario"
          name="username"
        />
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Correo electronico"
          name="email"
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          placeholder="Contraseña"
          name="password"
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          placeholder="Repetir contraseña"
          name="repeatPassword"
        />
        <Button type="submit" className="btn-submit">
          Registrar
        </Button>
      </Form>
    </>
  );
}

function initialFormValue() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
export default RegisterForm;
