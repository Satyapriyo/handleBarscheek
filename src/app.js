const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/connect");
const Register = require("./models/registers");
const port = process.env.PORT || 3000;
//for seeing the input data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const static_path = path.join(__dirname, "../public");
const templetes_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templetes_path);
hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
//create new user in our database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.conformpassword;
    if (password === cpassword) {
      const registerTrader = new Register({
        email: req.body.email,
        password: password,
        conformpassword: cpassword,
      });
      const registered = await registerTrader.save();
      res.status(201).render("index")
    } else {
      res.send("passwords are not same enter same password");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
