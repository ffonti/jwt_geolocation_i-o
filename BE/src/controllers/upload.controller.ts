import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const prisma = new PrismaClient();

exports.uploadFile = async (req, res) => {
  const userId = Number(req.headers["id"]);

  const userImgs = await prisma.file
    .findMany({
      select: {
        original_name: true,
      },
      where: {
        userId: userId,
      },
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });

  if (!fs.existsSync("./assets/uploads/" + userId.toString().trim() + "/")) {
    fs.mkdirSync("./assets/uploads/" + userId.toString().trim() + "/");
  }

  for (let i = 0; i < req.files.length; i++) {
    if (userImgs.includes(req.files[i])) {
      return res
        .status(400)
        .json({ msg: "Esiste già un immagine con questo nome!" });
    }

    req.files[i].originalname = Buffer.from(
      req.files[i].originalname,
      "latin1"
    ).toString("utf8");

    fs.rename(
      "./assets/uploads/" + req.files[i].filename,
      "./assets/uploads/" +
        userId.toString().trim() +
        "/" +
        req.files[i].originalname,
      (err) => {
        console.log(err);
      }
    );

    let encoded_name = req.files[i].filename.toString();
    let original_name = req.files[i].originalname.toString();

    await prisma.file
      .create({
        data: {
          encoded_name: encoded_name,
          original_name: original_name,
          userId: userId,
        },
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ msg: "Erorre!" });
      });
  }

  res.status(200).json({ msg: "Caricamento completato!" });
};

exports.getFiles = async (req, res) => {
  const userId = Number(req.headers["id"]);

  const fileNames = await prisma.file.findMany({
    where: {
      userId: userId,
    },
    select: {
      original_name: true,
    },
  });
  if (fileNames) {
    return res.status(200).json({ fileNames });
  } else {
    return res.status(400).json({ msg: "Non ci sono file" });
  }
};

export const download = async (req, res) => {
  const userId = Number(req.headers["id"]);
  const fileName = req.params.name;

  const file = await prisma.file
    .findFirst({
      where: {
        original_name: fileName,
      },
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ msg: "errore ooooo" });
    });

  if (file) {
    return res
      .status(200)
      .download("./assets/uploads/" + userId + "/" + fileName);
  } else {
    return res.status(400).json({ msg: "File non trovato!" });
  }
};

export const deleteFile = async (req, res) => {
  const userId = Number(req.headers["id"]);
  const fileName = req.params.name;

  const file = await prisma.file
    .findFirst({
      select: {
        id: true,
      },
      where: {
        userId: userId,
        original_name: fileName,
      },
    })
    .catch((err) => {
      return res.status(404).json({ msg: "File non trovato!" });
    });

  await prisma.file
    .delete({
      where: {
        id: file.id,
      },
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });

  fs.rmSync("./assets/uploads/" + userId + "/" + fileName);

  return res.status(200).json({ msg: "File eliminato con successo" });
};
