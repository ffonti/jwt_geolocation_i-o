import * as jwt from "jsonwebtoken";

exports.authJwt = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  //controllo req.headers deve esistere
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(res.status(403).json({ msg: "Utente non autorizzato" }));
    } else {
      next();
    }
  });
};
