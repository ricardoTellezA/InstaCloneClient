import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import ImageNotFound from "../../../assests/png/avatar.png";
import "./Profile.scss";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import UserNotFound from "../../UserNotFound/UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import AvatarForm from "../AvatarForm/AvatarForm";
import SettingsForm from "../SettingsForm";
import Followers from "./Followers";

const Profile = ({ username, totalPublications }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);
  const { auth } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <UserNotFound />;
  const { getUser } = data;

  const handleModal = (type) => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar Foto de Perfil");

        setChildrenModal(
          <AvatarForm setShowModal={setShowModal} auth={auth} />
        );
        setShowModal(true);

        break;

      case "settings":
        setTitleModal("");
        setChildrenModal(
          <SettingsForm
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            refetch={refetch}
            setChildrenModal={setChildrenModal}
            getUser={getUser}
          />
        );

        setShowModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={getUser.avatar ? getUser.avatar : ImageNotFound}
            avatar
            onClick={() => username === auth.username && handleModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <HeaderProfile
            getUser={getUser}
            auth={auth}
            handleModal={handleModal}
          />
          <Followers getUser={getUser.username} totalPublications={totalPublications} />
          <div className="other">
            <p className="name">{getUser.name}</p>
            {getUser.siteWeb && (
              <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                {getUser.siteWeb}
              </a>
            )}
            {getUser.description && (
              <p className="description">{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Profile;
