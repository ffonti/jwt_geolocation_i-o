import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const prisma = new PrismaClient();

exports.uploadFile = async (req, res) => {
  const userId = Number(req.headers["id"]);

  if (!fs.existsSync("./assets/uploads")) {
    fs.mkdirSync("./assets/uploads/");
  }

  for (let i = 0; i < req.files.length; i++) {
    fs.rename(
      "./assets/uploads/" + req.files[i].filename,
      "./assets/uploads/" + req.files[i].originalname,
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
  res.status(200).download("./assets/uploads/flower.jpg");
};
