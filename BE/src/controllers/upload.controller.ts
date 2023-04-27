import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const prisma = new PrismaClient();

exports.uploadFile = async (req, res) => {
  const userId = req.headers["id"];

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
    await prisma.file.create({
      data: {
        encoded_name: req.files[i].filename.toString(),
        original_name: req.files[i].originalname.toString(),
        userId: userId,
      },
    });
  }

  res.status(200).json({ msg: "Caricamento completato!" });
};

exports.getFiles = async (req, res) => {
  res.status(200).download("./assets/uploads/flower.jpg");
};

/*salvare sul db i dati
------------------------------------------
nel route, il file viene messo nella cartella ancora prima di passare al controller
*/
