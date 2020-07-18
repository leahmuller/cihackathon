import React, { useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import Container from "../components/Container";

export default function Profile(props) {
  const { user } = useAppContext();

  useEffect(() => {
    function onLoad() {
      if (!user) {
        props.history.push("/login");
      }
    }
    onLoad();
  }, [user, props]);

  return (
    <>
      <Container>
        <h1>Profile</h1>
        <h2>Username: {user.username}</h2>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
      </Container>
    </>
  );
}
