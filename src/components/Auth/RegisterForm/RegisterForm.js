import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../../gql/user";
import "./RegisterForm.scss";

function RegisterForm({ setShowLogin }) {
  // Mutation for registering a user
  const [registerUser] = useMutation(REGISTER_USER);
  const formik = useFormik({
    initialValues: initialFormValue(),
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "El nombre de usuario no es válido")
        .required("El nombre de usuario es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no coinciden"),
      repeatPassword: Yup.string()
        .required("Repita la contraseña")
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    }),
    onSubmit: async (values) => {
    //  USANDO MUTACIÓN PARA REGISTRAR USUARIO
    try {
      const newUser = values;
      delete newUser.repeatPassword;
      const {name, email, username, password} = newUser;
      const { data } = await registerUser({
        variables: { input: { name , email, username, password } },
      });
      toast.success("Usuario registrado correctamente");
      setShowLogin(true);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
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
          value={formik.values.name}
          placeholder="Nombre y Apellido"
          name="name"
          error={formik.errors.name}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          name="username"
          error={formik.errors.username}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          value={formik.values.email}
          placeholder="Correo electronico"
          name="email"
          error={formik.errors.email}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
          placeholder="Contraseña"
          name="password"
          error={formik.errors.password}
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          value={formik.values.repeatPassword}
          placeholder="Repetir contraseña"
          name="repeatPassword"
          error={formik.errors.repeatPassword}
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
