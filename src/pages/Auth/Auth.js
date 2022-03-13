import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "../../components/Auth/RegisterForm";
import instaclone from "../../assests/png/instaclone.png";
import "./Auth.scss";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Container fluid className="auth">
      <Image src={instaclone} alt="instaclone" />

      <div className="container-form">
        {showLogin ? (
          <p>Formulario de Login</p>
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta? {""}
              <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
            </>
          ) : (
            <>
              ¡Entrar con tu cuenta! {""}
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar Sesión
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default Auth;
