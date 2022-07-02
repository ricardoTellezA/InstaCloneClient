import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { UPDATE_USER } from "../../../gql/user";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./Web.scss";

const Web = ({ setShowModal, currentWeb, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      siteWeb: currentWeb || "",
    },
    validationSchema: Yup.object({
      siteWeb: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateUser({
          variables: {
            input: values,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast("Error al actualizar la web");
      }
    },
  });
  return (
    <Form className="web-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="siteWeb"
        value={formik.values.siteWeb}
        placeholder="siteWeb"
        onChange={formik.handleChange}
        className={formik.errors.siteWeb && "error"}
      />
      <Button type="submit" className="btn-submit">
        Guardar
      </Button>
    </Form>
  );
};

export default Web;
