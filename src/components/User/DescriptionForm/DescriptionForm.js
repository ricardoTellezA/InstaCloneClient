import React from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./DescriptionForm.scss";

const DescriptionForm = ({ setShowModal, currentDescription, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      description: currentDescription || "",
    },

    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values)
      try {
        await updateUser({
          variables: {
            input: values,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar la descripción");
      }
    },
  });
  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <TextArea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className={formik.errors.description && "error"}
      />

      <Button type="submit" className="btn-submit">
        Guardar
      </Button>
    </Form>
  );
};

export default DescriptionForm;
