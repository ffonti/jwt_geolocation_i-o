import * as jwt from "jsonwebtoken";

const { PrismaClient } = require("@prisma/client");
const { location, user } = new PrismaClient();

exports.postMarker = async (req, res) => {
  const userId = req.headers["id"];
  const name = req.body.nome.trim();
  const lat = req.body.lat.trim();
  const lng = req.body.lng.trim();

  if (name === "" || lat === "" || lng === "") {
    return res.status(400).json({
      msg: "Compilare tutti i campi",
    });
  }

  const markerExists = await location.findUnique({
    where: {
      lat: lat,
      lng: lng,
    },
  });

  if (markerExists) {
    return res.status(400).json({
      msg: "Coordinate già registrate",
    });
  }

  await user
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
        await location.create({
          data: {
            name,
            lat,
            lng,
          },
        });
        res.status(200).json({
          marker: {
            name,
            lat,
            lng,
          },
        });
      } else {
        return res.status(404).json({ msg: "Utente non trovato" });
      }
    });
};
