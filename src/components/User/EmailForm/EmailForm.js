import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./EmailForm.scss";

const EmailForm = ({ getUser, setShowModal, refetch }) => {
  const { email } = getUser;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      email: email || "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (values) => {
      try {
        await updateUser({
          variables: {
            input: values,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar el email");
      }
    },
  });
  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Escribe tu nuevo email"
        name="email"
        error={formik.errors.email && true}
      />
      <Button className="btn-submit" type="submit">
        Actualizar email
      </Button>
    </Form>
  );
};

export default EmailForm;
