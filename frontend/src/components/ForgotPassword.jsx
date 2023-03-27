import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";

function Forgotpassword(props) {
  //   const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [msg, setMsg] = useState("");

  const reset = (e) => {
    setemail(e.target.value);
    setpassword(e.target.value);
    setconfirm_password(e.target.value);
    console.log("data", { email, password, confirm_password });
    axios
      .post("http://localhost:5000/forgotPassword", {
        email,
        password,
        confirm_password,
      })
      .then((res) => {
        if (res.data.status === 1) {
          setMsg(res.data.message);
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
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Forgotpassword</h2>
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
              type="text"
              className="form-control"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="text"
              className="form-control"
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)}
              placeholder="Confirm Password"
            />
          </Form.Group>

          {email.length > 0 && password.length  > 0 &&
        confirm_password.length > 0? (
            <Button variant="primary" onClick={reset}>
              Reset password
            </Button>
          ) : (
            <Button variant="primary" disabled onClick={reset}>
              Reset password
            </Button>
          )}
              </Form><br/><br/>
              {msg}
      </div>
    </>
  );
}
export default Forgotpassword;
