import * as jwt from "jsonwebtoken";

exports.authJwt = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const id = req.headers["id"];
  const username = req.headers["username"];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);

    if (err || decoded.data.id != id || decoded.data.username != username) {
      res.status(403).json({ msg: "Utente non autorizzato" });
    } else {
      next();
    }
  });
};
