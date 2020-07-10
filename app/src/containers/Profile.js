import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, SignOut } from "aws-amplify-react";
import Container from "../components/Container";
import AmplifyTheme from "../AmplifyTheme";


function Profile() {
  
  useEffect(() => {
    checkUser();
  }, []);

  const [user, setUser] = useState({});

  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <SignOut/>
    </Container>
  );
}

export default withAuthenticator(Profile,
  {
    theme: AmplifyTheme,
    usernameAttributes: "email",
    signUpConfig: {
      hiddenDefaults: ["phone_number"],
    },
  }
);
