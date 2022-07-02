import React, { useState, useEffect, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import {  ToastContainer } from "react-toastify";
import AuthContext from "./context/authContext";
import { getToken,decodeToken, removeToken } from "./utils/token";

import client from "./config/apollo";
import Navigation from "./routers/Navigation";
import Auth from "./pages/Auth";

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
   
      
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  }

  const authData = useMemo(() => ({ auth, setUser, logout }), [auth]);
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer
          value={auth}
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
