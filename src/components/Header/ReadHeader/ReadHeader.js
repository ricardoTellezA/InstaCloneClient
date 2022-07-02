import React, {useState} from "react";
import { Icon, Image } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import { Link } from "react-router-dom";
import ModalUpload from "../../Modal/ModalUpload";
import ImageNotFound from "../../../assests/png/avatar.png";
import "./ReadHeader.scss";

const ReadHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;
  return (
    <>
    <div className="right-header">
      <Link to="home">
        <Icon name="home" />
      </Link>
      <Icon onClick={() => setShowModal(true)} name="plus" />
      <Link to={`/${auth.username}`}>
        <Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
      </Link>
    </div>
    <ModalUpload show={showModal} setShow={setShowModal}/>
    </>
  );
};

export default ReadHeader;
