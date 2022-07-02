import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import ImageNotFound from "../../../../assests/png/avatar.png";
import { GET_COMMENTS } from "../../../../gql/comment";
import "./Comment.scss";

const Comment = ({ publication }) => {
  const { loading, data, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publication.id,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return null;

  const { getComment } = data;

  return (
    <div className="comments">
      {map(getComment, (comment, index) => (
        <Link
          key={index}
          to={`/${comment.idUser.username}`}
          className="comment"
        >
          <Image
            src={comment.idUser.avatar ? comment.idUser.avatar : ImageNotFound}
            avatar
          />

          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comment;
