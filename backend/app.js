var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// var logger = require("morgan");
var cors = require("cors");//cross origin resourse sharing data
var fs = require("fs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/filesystem", function (req, res) {
  var exec = require("child_process").exec;

  var code = `#include<stdio.h>\nint main(){\n int a, b ,c;\na = 10;\n b= 20;\n c = a + b;\n printf("c = %d",c);\n}`;
  fs.writeFile(
    `/universal/practice_application_frontorbackend/backend/` + `file.c`, code,
    function (err) {
      if (err) {
        console.log("error", err);
      }
      else {
        exec("gcc file.c", function (err, stdout, stderr) {
          if (err) {
            res.send({ message: "compilation failed", error: stderr });
          }
          else {
            exec("a.exe", function (err, stdout, stderr) {
              if (err) {
                res.send({ message: "compilations failed", error: stderr });
              }
              else {
                res.send({ message: "compilation successs", output: stdout });
              }
            });
          }
        });
      }
    } 
  )
});

//------------------------------------how to create, read and append file starts here----------------------\
//create file
fs.writeFile('input.txt', 'hello', function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("written in existing file successfully");
  console.log("New data");
//read file
  fs.readFile('input.txt', function (err, data) {
    if (err) {
      console.log("error", err);
    }
    console.log(data.toString());
  });
//append file
  var data = "\n node js coder"
  fs.appendFile('input.txt', data, function (err) {
    if (err) throw err;
    console.log("data apended");
  })
});
//-------------------------------------------------ends here---------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
