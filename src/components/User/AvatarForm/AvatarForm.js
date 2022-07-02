import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AvatarForm.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";

import { toast } from "react-toastify";

const AvatarForm = ({ setShowModal, auth }) => {
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: {
            ...getUser,
            avatar: updateAvatar.urlAvatar,
          },
        },
      });
    },
  });
  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser:{
            ...getUser, avatar: ""
          }
        },
      });
    },
  });
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);

    try {
      setLoading(true);
      const result = await updateAvatar({
        variables: {
          file,
        },
      });
      const { data } = result;
      if (!data.updateAvatar.status) {
        toast.warning("Error al actualizar el avatar");
        setLoading(false);
      } else {
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      const result = await deleteAvatar();
      const { data } = result;
      if (!data.deleteAvatar) {
        toast.warning("Error al eliminar el avatar");
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <h1 className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
      <Button onClick={() => onDeleteAvatar()}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </h1>
  );
};

export default AvatarForm;
