import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "../gql/publication";
import Profile from "../components/User/Profile";
import Publications from "../components/publications/Publications";

const User = () => {
  const { username } = useParams();

  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: { username },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      startPolling();
    };
  }, [startPolling, startPolling]);

  if (loading) return null;

  const { getPublication } = data;
  return (
    <>
      <Profile username={username} totalPublications={size(getPublication)} />
      <Publications getPublication={getPublication} />
    </>
  );
};

export default User;
