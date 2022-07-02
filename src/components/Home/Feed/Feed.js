import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_PUBLICATIONS_FOLLOW } from "../../../gql/publication";
import Action from "../../Modal/ModalPublication/Actions";
import CommentForm from "../../Modal/ModalPublication/ComentForm";
import ImageNotFound from "../../../assests/png/avatar.png";
import "./Feed.scss";

const Feed = () => {
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOW);

  //   useEffect(() => {
  //     if(!getPublicationsFollowers){
  //       // redirect to login
  //       return <Navigate to="/login" />
  // }
  //   }, [getPublicationsFollowers]);

  if (loading) return <div>Loading...</div>;
  const { getPublicationsFollowers } = data;

  return (
    <div className="feed">
      {map(getPublicationsFollowers, (publication, index) => (
        <div key={index} className="feed__box">
          <Link to={`/${publication.idUser.username}`}>
            <div className="feed__box-user">
              <Image src={publication.idUser.avatar || ImageNotFound} avatar />
              <span>{publication.idUser.name}</span>
            </div>
          </Link>
          <div
            className="feed__box-image"
            style={{ backgroundImage: `url(${publication.file})` }}
          />

          <div className="feed__box-actions">
            <Action publication={publication} />
          </div>
          <div className="feed__box-form">
            <CommentForm publication={publication} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
