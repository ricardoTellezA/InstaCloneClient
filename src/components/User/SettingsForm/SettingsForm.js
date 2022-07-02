import React from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm/PasswordForm";
import DescriptionForm from "../DescriptionForm/DescriptionForm";
import EmailForm from "../EmailForm";
import Web from "../web";

const SettingsForm = ({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  getUser,
  refetch,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const client = useApolloClient();

  const onChangePassword = () => {
    setTitleModal("Cambiar Contraseña");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar Correo");
    setChildrenModal(
      <EmailForm
        refetch={refetch}
        getUser={getUser}
        setShowModal={setShowModal}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Cambiar Descripción");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };

  const onChangeWeb = () => {
    setChildrenModal("Cambiar Web");
    setChildrenModal(
      <Web
        setShowModal={setShowModal}
        currentWeb={getUser.siteWeb}
        refetch={refetch}
      />
    );
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    navigate("/");
  };
  return (
    <div className="settings-form">
      <Button onClick={() => onChangePassword()}>Cambiar contraseña</Button>
      <Button onClick={() => onChangeEmail()}>Cambiar email</Button>
      <Button onClick={() => onChangeDescription()}>Descripción</Button>
      <Button onClick={() => onChangeWeb()}>Sitio web</Button>
      <Button onClick={onLogout}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
