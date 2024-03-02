const express = require("express");
const app = express();
const port = 3050;
const ConnectDB = require("./DBConnection/dbConnection");
ConnectDB();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const SignupRouter = require("./Routes/Authentication/SignUp");
const LoginRouter = require("./Routes/Authentication/Login");
const ForgotPasswordRouter = require("./Routes/Authentication/ForgotPassword");
const FPUpdateRouter = require("./Routes/Authentication/FPUpdate");
const UserValidationRouter = require("./Routes/Application/UserValidation");
const HomeRouter = require("./Routes/Application/Home");
// const ReportRouter = require("./Routes/Application/Report");

app.use(bodyParser.json(), cors({ origin: "*" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FSM Server started successfully 😊 ");
});

app.use("/signup", SignupRouter);

app.use("/login", LoginRouter);

app.use("/forgotpassword", ForgotPasswordRouter);

app.use("/FPUpdate", FPUpdateRouter);

app.use("/validUser", UserValidationRouter);

app.use("/home", HomeRouter);

app.listen(port, () => {
  console.log(`Server started successfully in the port: ${port}`);
});
