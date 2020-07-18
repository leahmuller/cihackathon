import React, { useEffect } from "react";
import { Auth, Logger } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { useAppContext } from "../libs/contextLib";
import Container from "../components/Container";
import AmplifyTheme from "../AmplifyTheme";

const logger = new Logger("Login", "DEBUG");

function Login(props) {
  const { setIsAuthenticating, userHasAuthenticated, setUser } = useAppContext();

  useEffect(() => {
    checkUser();
  });

  function checkUser() {
    try {
      setIsAuthenticating(true);
      const data = Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      userHasAuthenticated(true);
      setIsAuthenticating(false);
      props.history.push("/algorithms");
    } catch (e) {
      logger.error(e);
    }
  }

  return (
    <Container>
      <h1>Login</h1>
    </Container>
  )
}

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Name",
      key: "name",
      required: true,
      placeholder: "Name",
      type: "name",
      displayOrder: 1,
    },
    {
      label: "Email",
      key: "username",
      required: true,
      placeholder: "Email",
      type: "email",
      displayOrder: 2,
    },
    {
      label: "Password",
      key: "password",
      required: true,
      placeholder: "Password",
      type: "password",
      displayOrder: 3,
    },
  ],
};

export default withAuthenticator(Login, {
  theme: AmplifyTheme,
  usernameAttributes: "email",
  signUpConfig: signUpConfig,
});
