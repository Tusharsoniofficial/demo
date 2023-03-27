import React, { useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Userdetails = () => {
  const Email = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [profile_pic, setProfile_pic] = useState();
  console.log("profile Pic", profile_pic);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  // const [Active, setActive] = useState(false);

  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  //-----------------------------------------------------------------all user data api
  const handlesubmit = (e) => {
    axios.get("http://localhost:5000/getUserDetails").then((res) => {
      setData(res.data.response);
      console.log("backend response", res);
    });
  };
  //--------------------------------------------------------------specific user delete data api

  const userDelete = async (email, firstname) => {
    if (window.confirm(`are you sure you want delete ${firstname}`)) {
      axios
        .post("http://localhost:5000/userDelete", { email })
        .then((res) => {
          if (res.data.status === 1) {
            console.log(res);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  //------------------------------------------------------------update user data

  const handleShow = async (email, firstname, lastname, contact) => {
    setShow(true);
    setEmail(email);
    setFirstname(firstname);
    setLastname(lastname);
    setContact(contact);
  };

  const handleClose = (e) => {
    setShow(false);
    setFirstname(e.target.value);
    setLastname(e.target.value);
    setEmail(e.target.value);
    setContact(e.target.value);

    axios
      .post("http://localhost:5000/newuserUpdate", {
        firstname,
        lastname,
        email,
        contact,
      })
      .then(async (res) => {
        if (res.data.status === 1) {
          console.log("backend response", res);
          await handlesubmit();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleUpload = (e) => {
    console.log("e.target", e.target);
  };
  const handleProfile = (e) => {
    console.log("hello");
    console.log("profile_pic in handleProfile ", profile_pic);
    axios
      .post("http://localhost:5000/profileUpload", { profile_pic })
      .then((res) => {
        if (res) {
          console.log("res in profile uploading", res);
        } else {
          console.log("error in profile uploading");
        }
      });
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "75px", marginBottom: "75px" }}
    >
      {Email ? <p>Wellcome, {Email}</p> : ""}

      <h3 style={{ fontFamily: "monospace" }}>Alldata</h3>

      <br />

      <Button variant="primary" onClick={handlesubmit}>
        Click
      </Button>
      <br />
      {/* {data.map((item, index) => { return <p key={index}>{item.firstname}{item.lastname}</p> })} */}
      <br />
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ width: "50%", display: "inline" }}
      >
        <thead>
          <tr>
            <th>S.no</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
            <th>Choose Profile</th>
            <th>Upload Profile</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => userDelete(item.email, item.firstname)}
                >
                  Delete
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    handleShow(
                      item.email,
                      item.firstname,
                      item.lastname,
                      item.contact
                    );
                  }}
                  variant="primary"
                >
                  Update
                </Button>
              </td>
              <td>
                <input
                  type="file"
                  name="profile_pic"
                  onChange={(e) => {
                    setProfile_pic(e.target.files);
                  }}
                ></input>
              </td>
              <td>
              <Button onClick={handleProfile} >profile_upload</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                placeholder="firstname"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                placeholder="lastname"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="email@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                placeholder="Contact number"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleClose(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
    </div>
  );
};

export default Userdetails;
