import * as jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.postMarker = async (req, res) => {
  const userId = Number(req.headers["id"]);
  const name = req.body.nome.toString().trim();
  const lat = req.body.lat.toString().trim();
  const lng = req.body.lng.toString().trim();

  if (name === "" || lat === "" || lng === "") {
    return res.status(400).json({
      msg: "Compilare tutti i campi",
    });
  }

  await prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    })
    .then(async (userExists) => {
      if (userExists) {
        await prisma.location.create({
          data: { name, lat, lng, userId },
        });
        return res.status(200).json({ marker: { name, lat, lng, userId } });
      } else {
        return res.status(404).json({ msg: "Utente non trovato" });
      }
    });
};
