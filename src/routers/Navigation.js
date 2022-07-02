import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import Layaout from "../layaouts/Layaout";

const Navigation = () => {
  return (
    <div>
      <Router>
        <Layaout>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/:username" element={<User />}></Route>

          <Route path="*" element={<Error404 />}></Route>
        </Routes>
        </Layaout>
      </Router>
    </div>
  );
};

export default Navigation;
