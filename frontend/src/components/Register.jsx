import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contact: 0,
  });
  console.log("data", data);
  const handlesubmit = (e) => {
    setData({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      contact: contact,
    });
    setFirstname(e.target.value);
    setLastname(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    setContact(e.target.value);
    axios
      .post("http://localhost:5000/userRegister", {
        firstname,
        lastname,
        email,
        password,
        contact,
      })
      .then((res) => {
        if (res.data.status === 1) {
          alert(res.data.message);
          console.log("backend response", res);
        } else {
          alert(res.data.message);
          console.log("backend response", res);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Register</h2>
        <br />
        <Form className="form" style={{ display: "inline-block" }}>
          <Form.Group className="mb-3" controlId="formGroupFirstname">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="text"
              className="form-control"
              value={firstname}
              placeholder="Firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupLastname">
            <Form.Control
              type="text"
              className="form-control"
              value={lastname}
              placeholder="Lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="email"
              className="form-control"
              value={email}
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              className="form-control"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupContact">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="number"
              className="form-control"
              value={contact}
              placeholder="Contact"
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>

          {firstname.length > 0 &&
          lastname.length > 0 &&
          email.length > 0 &&
          password.length > 0 &&
          contact.length > 0 ? (
            <Button variant="primary" onClick={handlesubmit}>
              Sign Up
            </Button>
          ) : (
            <Button variant="primary" disabled onClick={handlesubmit}>
              Sign Up
            </Button>
          )}
          <br />
          <br />
        </Form>
        <p className="link">
          <Link style={{ textDecoration: "none", color: "black" }} to="/login">
            Already have an account
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
