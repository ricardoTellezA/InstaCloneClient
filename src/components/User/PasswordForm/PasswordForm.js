import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss";
import { toast } from "react-toastify";

const PasswordForm = ({logout}) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Este campo es requerido"),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("confirmPassword")]),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (formData) => {
      try {
       const result =  await updateUser({
          variables: {
            input: {
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
            },
          },
        });
        if(!result.data.updateUser){
          toast.error("Error al actualizar la contraseña");

        }else{
          logout();
        }
      } catch (error) {
        toast.error("Error al actualizar la contraseña");
      }
    },
  });
  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Contraseña actual"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Nueva contraseña"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Confirmar contraseña"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.errors.confirmPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

function initialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
}

export default PasswordForm;
