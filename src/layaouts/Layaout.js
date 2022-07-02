import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../components/Header";
const Layaout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="layaout">{children}</Container>
    </>
  );
};

export default Layaout;
