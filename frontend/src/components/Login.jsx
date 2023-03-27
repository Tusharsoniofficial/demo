import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link,useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setMsg] = useState("");

  //------------------------------------------------function starts
  const handletask = (e) => {
    setemail(e.target.value);
    setpassword(e.target.value);
    axios
      .post("http://localhost:5000/userLogin", { email, password })

      .then((res) => {
        if (res.data.status === 1) {
          setMsg(res.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);

          localStorage.setItem("email", res.data.email);
          console.log("backend response", res);
        } else {
          setMsg(res.data.message);
          console.log("backend response", res);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  //------------------------------------------------function ends

  return (
    <>
      <div
        className="login"
        style={{ textAlign: "center", marginTop: "100px" }}
      >
        <h2>Login</h2>
        <br />

        <Form style={{ display: "inline-block" }}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              className="form-control"
              value={email}
              placeholder="email@example.com"
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              className="form-control"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          {email.length > 0 && password.length > 0 ? (
            <Button variant="primary" onClick={handletask}>
              Sign in
            </Button>
          ) : (
            <Button variant="primary" disabled onClick={handletask}>
              Sign in
            </Button>
          )}
        </Form>
        <br />
        <br/>
        <p className="link">
          <Link style={{ textDecoration: "none", color: "black" }} to="/forgotpassword">
            ! Forgot Password
          </Link>
        </p>
        <br />
        <br />
        {msg}
      </div>
    </>
  );
};
export default Login;
