const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uuidAPIKey = require("uuid-apikey");
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: "Auth token required" });
    }

    const isVerified = await jwt.verify(token, "mytopsecret");

    if (isVerified) {
      req.user = isVerified;
      next();
    } else {
      res.status(403).send({ message: "Invalid Access token" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

router
  .get("/user", verifyUser, async (req, res) => {
    const { id } = req.user;
    // find the user with this id

    const user = await User.findOne({ _id: id });
    const { _id, username, email, first_name, last_name, avatar, api_key } =
      user;
    return res
      .status(200)
      .send({
        id: _id,
        username,
        email,
        first_name,
        last_name,
        avatar,
        api_key,
      });
  })
  .put("/generate", verifyUser, async (req, res) => {
    const { id } = req.user;

    //make a random unique api key and update it to the user account

    const { apiKey } = uuidAPIKey.create();

    User.updateOne({ _id: id }, { api_key: apiKey }).then(() => {
      res.status(200).send({ apiKey });
    });
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    // first find the user with this email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "No user found with this email" });
    }

    // otherwise compare password
    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).send({ message: "Invalid username or password" });
    }

    /* else generate a token and handover
     to the client so it make his/her data*/
    const token = jwt.sign({ id: user._id }, "mytopsecret");
    res.status(200).send({ token });
  })
  .post("/register", async (req, res) => {
    const { email, password, username, first_name, last_name, avatar } =
      req.body;

    if (!email || !password || !username || !first_name || !last_name) {
      return res.status(401).send({ message: "Fields required" });
    }

    // first find a username with incoming username in database

    const uname = await User.findOne({ username: username });

    if (uname) {
      return res.status(401).send({ message: "Username already exists" });
    }

    // find the user with incoming email

    const user = await User.findOne({ email: email });

    if (user) {
      res.status(401).send({ message: "User exists with this email" });
    }

    // make a hashed password
    var hash = await bcrypt.hashSync(password, 10);
    // else make a new user

    new User({
      email,
      username,
      first_name,
      last_name,
      avatar,
      password: hash,
    })
      .save()
      .then(() => {
        res.status(200).send({ message: "Successfully Registered!" });
      });
  });

module.exports = router;
