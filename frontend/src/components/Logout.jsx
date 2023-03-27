import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Logout = () => {
  const navigate = useNavigate();
  const Email = localStorage.getItem("email");
  const handletask = () => {
    if (Email) {
      setTimeout(() => {
        navigate("/login");
        localStorage.removeItem("email");
      }, 3000);
    } else {
      alert("you haven't login yet");
    }
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handletask}>
        Logout
      </Button>

      <br />
    </div>
  );
};

export default Logout;
