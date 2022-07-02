import React from "react";
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOWING, FOLLOW, UN_FOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss";

const HeaderProfile = ({ getUser, auth, handleModal }) => {
  const { loading, data } = useQuery(IS_FOLLOWING, {
    variables: { username: getUser.username },
  });
  const [follow] = useMutation(FOLLOW, {
    // LIMPIAR CACHE
    update(cache, { data: { follow } }) {
      const { isFollowing } = cache.readQuery({
        query: IS_FOLLOWING,
        variables: { username: getUser.username },
      });
      cache.writeQuery({
        query: IS_FOLLOWING,
        variables: { username: getUser.username },
        data: { isFollow: !isFollowing },
      });
    }
  });

  const [unFollow] = useMutation(UN_FOLLOW, {
    update(cache, { data: { unFollow } }) {
      const { isFollowing } = cache.readQuery({
        query: IS_FOLLOWING,
        variables: { username: getUser.username },
      });
      cache.writeQuery({
        query: IS_FOLLOWING,
        variables: { username: getUser.username },
        data: { isFollow: false },
      });
    }
  });


  const onFollow = async () => {
    try {
      await follow({
        variables: { username: getUser.username },
      });
    } catch (error) {
      console.log(error)
    }
  }

  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: { username: getUser.username },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button onClick={() => onUnFollow()} className="btn-danger">
          Dejar de seguir
        </Button>
      )
    } else {
      return (
        <Button onClick={() => onFollow()} className="btn-action">
          Seguir
        </Button>
      )
    }
  }
  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <Button onClick={() => handleModal("settings")}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};

export default HeaderProfile;
