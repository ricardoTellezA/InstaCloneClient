import React, { useState, useCallback } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import "./ModalUpload.scss";
import { PUBLISH } from "../../../gql/publication";

const ModalUpload = ({ show, setShow }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publish] = useMutation(PUBLISH);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setLoading(false);
    setFileUpload(null);
    setShow(false);
  };

  const onPublic = async () => {
    try {
      setLoading(true);
      const { data } = await publish({
        variables: {
          file: fileUpload.file,
        },
      });

      if (!data.publish.status) {
        toast.warning("Error al publicar");
        setLoading(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" size="huge" />
            <p>Arrastra tu foto que quieras publicar</p>
          </>
        )}

        <input {...getInputProps()} />
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload btn-action" onClick={onPublic}>
          Publicar
        </Button>
      )}

      {loading && (
        <Dimmer active className="publishi">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
};

export default ModalUpload;
