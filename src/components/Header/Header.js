import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assests/png/instaclone.png";
import ReadHeader from "./ReadHeader";
import Search from "./Search";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header__logo">
            <Link to="/">
              <Image src={Logo} alt="Instaclone" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
           <Search/>
          </Grid.Column>
          <Grid.Column width={3}>
           <ReadHeader/>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
