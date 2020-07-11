import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as Logo } from "../assets/vectors/logo.svg";

const NavMenu = (props) => {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home">
          <Logo /> CI Hackathon
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/protected">Protected</Nav.Link>
          <Nav.Link href="/files">Files</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavMenu;
