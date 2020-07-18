import React, { useEffect } from "react";
import Container from '../components/Container';
import { useAppContext } from "../libs/contextLib";
import { Auth, Logger } from "aws-amplify";

const logger = new Logger("Logout", "DEBUG");

function Logout(props) {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  useEffect(() => {
    (isAuthenticated) && props.history.push('/login')
    // Only logout authenticated users
    handleLogout();
    // eslint-disable-next-line
  }, []);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    logger.debug("User logged out");
    props.history.push("/login");
  }

  return (
    <Container>
      <h1>Logout</h1>
    </Container>
  )
}

export default Logout