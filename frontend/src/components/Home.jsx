import React from 'react'

const Home = () => {
  const Email = localStorage.getItem("email");
  console.log(Email);
  return (
    <div className="logout" style={{ margin: "100px",fontFamily:"arial"}}>
      <h1>Hello,</h1>
      <p> {Email?(<p>Wellcome, {Email}</p>):("")}</p>
    <h1>Wellcome to my home page</h1>
  </div>
  )
}

export default Home