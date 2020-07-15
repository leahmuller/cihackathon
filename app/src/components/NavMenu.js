import React, { useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { Logger } from "aws-amplify";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as Logo } from "../assets/vectors/logo.svg";

const logger = new Logger("NavMenu", "DEBUG");

function NavMenu(props) {
  const { isAuthenticated, isAuthenticating } = useAppContext();

  useEffect(() => {
    logger.debug("isAuthenticated:" + isAuthenticated + " isAuthenticating:" + isAuthenticating)
  }, [isAuthenticating, isAuthenticated])

  return (
    !isAuthenticating && (
    <>
      <Navbar>
        <Navbar.Brand href="#home">
          <Logo /> CI Hackathon
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isAuthenticated ? (
            <>
              <Nav.Link href="/protected">Protected</Nav.Link>
              <Nav.Link href="/algorithms">Algorithms</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/protected">Protected</Nav.Link>
              <Nav.Link href="/profile">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
    )
  );
};

export default NavMenu;
