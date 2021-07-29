const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        
        return res.status(400).json({ message: "Please Login Again!" });
      }
    });
    req.user = user;
  } else {
    return res.status(400).json({ message: "Please Login Again!" });
  }
  next();
};
