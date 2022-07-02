import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { size } from "lodash";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  ADD_LIKE,
  IS_LIKE,
  DELETE_LIKE,
  COUNT_LIKES,
} from "../../../../gql/like";
import "./Acions.scss";

const Acions = ({ publication }) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [likes, setLikes] = useState(0);
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: { idPublication: publication.id },
  });

  const { data: countLikes, refetch: likesRefetch } = useQuery(COUNT_LIKES, {
    variables: { idPublication: publication.id },
  });

  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({ variables: { idPublication: publication.id } });
      refetch();
      likesRefetch();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const ondeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({ variables: { idPublication: publication.id } });
      refetch();
      likesRefetch();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onClickLike = () => {
    if (!loadingAction) {
      if (isLike) {
        ondeleteLike();
      } else {
        onAddLike();
      }
    }
  };


  useEffect(() => {
    if(countLikes){
      setLikes(countLikes.countLikes);
    }
  }, [countLikes]);


  if (loading) return null;
 

  const { isLike } = data;

  return (
    <div className="actions">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onClickLike}
      />
      <p>{likes}</p>
    </div>
  );
};

export default Acions;
