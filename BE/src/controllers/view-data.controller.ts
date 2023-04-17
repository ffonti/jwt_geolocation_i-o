import { PrismaClient } from "@prisma/client";
const { nome, colore } = new PrismaClient(); //cos'è??

exports.getNomi = async (req, res) => {
  const nomi = await nome.findMany();
  return res.status(200).json({ nomi });
};

exports.getColori = async (req, res) => {
  const colori = await colore.findMany();
  return res.status(200).json({ colori });
};
