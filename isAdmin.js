const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    console.log(user)
    req.user = user;
    next();
  });
};

module.exports = { isAdmin };
