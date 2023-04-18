import * as jwt from "jsonwebtoken";

const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

exports.register = async (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password;

  if (username === "") {
    return res.status(400).json({
      msg: "Il campo username è vuoto",
    });
  }

  if (password.trim() === "") {
    return res.status(400).json({
      msg: "Il campo password è vuoto",
    });
  }

  const userExists = await user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
    },
  });

  if (userExists) {
    return res.status(400).json({
      msg: "Username già registrato",
    });
  }

  await user.create({
    data: {
      username,
      password,
    },
  });
  res.status(201).json({
    msg: "Registrazione completata! Effettuare il login",
  });
};

exports.login = async (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password;

  await user
    .findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
      },
    })
    .then((userExists) => {
      if (userExists) {
        const user = {
          id: userExists.id,
          username: userExists.username,
          role: userExists.role,
        };

        const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });

        if (password !== userExists.password) {
          return res.status(400).json({ msg: "Password errata" });
        }

        return res.status(200).json({
          token: token,
          id: userExists.id,
          username: userExists.username,
          role: userExists.role,
        });
      } else {
        return res.status(404).json({ msg: "Utente non trovato" });
      }
    });
};
