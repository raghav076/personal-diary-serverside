const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err: err.message });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered, please log in!" });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });
    console.log(_user);

    _user.save((err, user) => {
      if (err) {
        return res.status(400).json({ err: err.message });
      }
      if (user) {
        return res
          .status(200)
          .json({ message: "User Created Successfully", user: user });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(400).json({ err: err.message });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token);
        const { _id, firstName, lastName, email, fullName } = user;
        console.log(user);
        res.status(200).json({
          token: token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password!",
        });
      }
    } else {
      console.log("enter valid email");
      return res
        .status(400)
        .json({ message: "Email is not registered, please signup first!" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signout Successfully!" });
};
