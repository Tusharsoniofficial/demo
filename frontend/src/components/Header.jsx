import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./Footer";
// import Button from 'react-bootstrap/Button';
import Logout from "./Logout";

const Header = () => {
  return (
    <>
      <Navbar
        className="d-flex"
        bg="black"
        variant="dark"
        expand="lg"
        style={{ display: "inline-block" }}
      >
        <Container>
          <Navbar.Brand
            className="logo"
            href="/"
            style={{ marginLeft: "50px" }}
          >
            ArticFox
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        <Navbar.Collapse id="basic-navbar-nav" style={{ marginRight: "60px" }}>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/codeEditor">CodeEditor</Nav.Link>
            <Nav.Link href="/userdetails">UserData</Nav.Link>
            <Nav.Link href="/useReducer">UserReducer</Nav.Link>
            <Logout />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Header;
