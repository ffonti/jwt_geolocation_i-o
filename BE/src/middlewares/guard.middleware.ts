import * as jwt from "jsonwebtoken";

exports.guard = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const id = req.headers["id"];
  const username = req.headers["username"];
  const role = req.headers["role"];
  //query con id che mi restituisce il ruolo
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (
      err ||
      decoded.data.id != id ||
      decoded.data.username != username ||
      decoded.data.role != role ||
      role.toString().toUpperCase() != "ADMIN"
    ) {
      res.status(403).json({ msg: "Utente non autorizzato" });
    } else {
      next();
    }
  });
};
