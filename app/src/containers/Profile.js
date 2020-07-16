import React, { useState, useEffect } from "react";
import { Auth, Logger } from "aws-amplify";
import { withAuthenticator, SignOut } from "aws-amplify-react";
import { useAppContext } from "../libs/contextLib";
import Container from "../components/Container";
import AmplifyTheme from "../AmplifyTheme";

const logger = new Logger("Profile", "DEBUG");

function Profile(props) {
  const { setIsAuthenticating, userHasAuthenticated } = useAppContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      setIsAuthenticating(true);
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      userHasAuthenticated(true);
      setIsAuthenticating(false);

      // Testing 
      logger.debug("User logged in and redirected");
      logger.debug(userInfo);
      props.history.push("/home");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <>
      <Container>
        <h1>Profile</h1>
        <h2>Username: {user.username}</h2>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
        <SignOut />
      </Container>
    </>
  );
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

export default withAuthenticator(Profile, {
  theme: AmplifyTheme,
  usernameAttributes: "email",
  signUpConfig: signUpConfig,
});
