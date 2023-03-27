const DbConnect = require("../databse/config");
const jwt = require("jsonwebtoken");
// const { fstat } = require("fs");
var fs = require("fs");
// const nodemailer = require("nodemailer");
// const otp = require('otp-generator');

//------------------------------------------------user Login Controller  (old part of log in)
const userLoginController = async (req, res) => {
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const response = await DbConnect.getConnect();
  const data = await response.find({ email: email }).toArray();
  console.log("data", data);
  if (data.length > 0) {
    if (email === data[0].email && password === data[0].password) {
      const token = jwt.sign({ email: data[0].email }, "tushar@gmail.com", {
        expiresIn: "5m",
      });
      console.log("token", token);
      res.send({
        message: "User login successfully",
        status: 1,
        email: email,
        token: token,
      });
    } else {
      res.send({ message: "Invalid username password", status: 0 });
    }
  } else {
    res.send({ message: "User not found, you need to register", status: 0 });
  }
};

//----------------------------------------------------user logout

const userLogoutController = async (req, res) => {
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const response = await DbConnect.getConnect();
  const data = await response.find({ email: email }).toArray();
  console.log("data", data);
  if (data.length > 0) {
    if (email === data[0].email && password === data[0].password) {
      res.send({
        message: "User logout successfully",
        status: 1,
        response: email,
      });
    } else {
      res.send({ message: "Invalid username password", status: 0 });
    }
  } else {
    res.send({ message: "user not found", status: 0 });
  }
};

//---------------------------------------------------user Register (inserting data through node to mongodb) Controller

const userRegisterController = async (req, res) => {
  console.log(req);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const contact = req.body.contact;
  const password = req.body.password;

  const response = await DbConnect.getConnect();
  const data = await response.find({ email: req.body.email }).toArray();
  if (data.length > 0) {
    if (data[0].email === req.body.email) {
      res.send({ message: "user is already exists" });
      console.log("user is already axists");
    }
  } else {
    const data = await response.insertOne({
      firstname: firstname,
      lastname: lastname,
      email: email,
      contact: contact,
      password: password,
    });
    console.log("data", data);
    if (data.insertedId) {
      res.send({ message: "user inserted successfully", status: 1 });
    } else {
      res.send({ message: "user not inserted", status: 0 });
    }
  }
};

//-------------------------------------------------old part
// const userRegisterController = async (req, res) => {
//   console.log(req);
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const email = req.body.email;
//   const password = req.body.password;
//   const contact = req.body.contact;

//   const otpcode = otp.generate(6, {
//     upperCaseAlphabets: false,
//     specialChars: false,
//     lowerCaseAlphabets: false,
//   });
//   console.log("otpcode", otpcode);
//   const response = await DbConnect.getConnect();
//   const data = await response.insertOne({
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//     password: password,
//     contact:contact
//   });
//   console.log("data", data);
//   if (data.insertedId) {
//     res.send({ message: "User inserted successfully", status: 1 });
//   }
//   else {
//     res.send({ message: "User not inserted", status: 0 });
//   }
// }

//--------------------------------------------------forgot Password Controller
const forgotPasswordController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const response = await DbConnect.getConnect();
  const findData = await response.find({ email: email }).toArray();
  console.log("findData", findData);
  // console.log(email, password, confirm_password);
  if (findData[0].email) {
    const updateData = await response.updateOne(
      { email: email },
      { $set: { password: password } }
    );
    if (updateData) {
      if (password === confirm_password) {
        res.send({
          message: "password reset successfully",
          title: "Express",
          email: email,
          password: password,
          confirm_password: confirm_password,
          status: 1,
        });
      } else {
        res.send({
          message: "password and confirm_password should be same",
          title: "Express",
          email: email,
          password: password,
          confirm_password: confirm_password,
          status: 0,
        });
      }
    }
  }
};

//--------------------------------------------------delete user controller
const UserDeleteController = async (req, res) => {
  console.log("delete user");
  const emailDelete = req.body.email;
  const response = await DbConnect.getConnect();
  const findData = await response.find({ email: emailDelete }).toArray();
  console.log("findData", findData);
  // return;
  if (findData[0].email) {
    const deleteData = await response.deleteOne({ email: emailDelete });
    if (deleteData) {
      res.send({ message: "user deleted succesfully", status: 1 });
    } else {
      res.send({ message: "user not deleted", status: 0 });
    }
  } else {
    res.send({ message: "user not found", status: 0 });
  }
};

//-------------------------------------------------function isActive()
const isActive = async (Active) => {
  return new Promise((resolve, reject) => {
    if (Active === 1) {
      return resolve({ message: "Active", status: 1 });
    } else {
      return resolve({ message: "inactive", status: 0 });
    }
  });
};

//---------------------------------------------------user profile Controller

const userprofileController = async (req, res) => {
  const result = await isActive(req.body.Active);
  console.log(result);
  if (result.status === 1) {
    res.send({ message: "user is active", status: 1, email: req.body.email });
  } else {
    res.send({ message: "user is inactive", status: 0 });
  }
};
//---------------------------------------------------user profile upload Controller
const profileUpload = async (req, res) => {
  console.log("req in profile pic", req);
  console.log("req.body in profile pic", req.body);
  console.log("req.file in profile pic", req.file);
  const email = "tushar@gmail.com";
  const response = await DbConnect.getConnect();
  const findData = await response.find({ email: email }).toArray();
  console.log("findData.length", findData);
  // return;



  const updateData = await response.updateOne(
    { email: email },
    { $set: { profile_pic: "profile_pic" } }
  );
  console.log("updateData", updateData);
  if (updateData) {
    console.log("updated Data in if", updateData);
    res.send({ message: "profic pic uploading request", status: 1 });
  } else {
    res.send({
      message: " error in profic pic uploading request while updating in db",
      status: 0,
    });
  }
  // res.send({ message: "profic pic uploading request", status: 1 });
  // fs.writeFile('backend/uploads'+req.file.originalname,"", function (err) {
  //   if (err) {
  //     res.send({ message: "error in file storage", status: 0,error:err });
  //   }
  //   else{
  //     res.send({ message: "profic pic uploading request", status: 1 });
  //   }
  // });
};

//--------------------------------------------------get user controller

const getUserDetailscontroller = async (req, res) => {
  const response = await DbConnect.getConnect();
  const data = await response.find().toArray();
  console.log("data", data);
  res.send({ message: "user Details fetched", status: 1, response: data });
};

//-----------------------------------------------get user specific details by email in controller

const getUserDetailsbyemailcontroller = async (req, res) => {
  const email = req.body.email;
  const response = await DbConnect.getConnect();
  const data = await response.find({ email: email }).toArray();
  console.log("data", data);
  if (data.length > 0) {
    res.send({
      message: "user Details fetched successfully",
      status: 1,
      response: data,
    });
  } else {
    res.send({ message: "User Details not found", status: 0, response: data });
  }
};

//------------------------------------------------user update controller

const userUpdatController = async (req, res) => {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const response = await DbConnect.getConnect();
  const findData = await response.find({ email: email }).toArray();
  console.log("findData", findData);
  // return;
  if (findData[0].email) {
    const updateData = await response.updateOne(
      { email: email },
      { $set: { firstname: firstname } }
    );
    if (updateData) {
      res.send({ message: "user updated succesfully", status: 1 });
    } else {
      res.send({ message: "user not updated", status: 0 });
    }
  } else {
    res.send({ message: "user not found", status: 0 });
  }
};

//-------------------------------------------------new user update controller

const newuserUpdatController = async (req, res) => {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const contact = req.body.contact;
  const response = await DbConnect.getConnect();
  const findData = await response.find({ email: email }).toArray();
  console.log("findData", findData);
  // return;
  if (findData[0].email) {
    const updateData = await response.updateOne(
      { email: email },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          contact: contact,
        },
      }
    );
    if (updateData) {
      res.send({ message: "user updated succesfully", status: 1 });
    } else {
      res.send({ message: "user not updated", status: 0 });
    }
  } else {
    res.send({ message: "user not found", status: 0 });
  }
};

module.exports = {
  userLoginController,
  userLogoutController,
  userRegisterController,
  forgotPasswordController,
  userprofileController,
  getUserDetailscontroller,
  getUserDetailsbyemailcontroller,
  UserDeleteController,
  userUpdatController,
  newuserUpdatController,
  profileUpload,
};
