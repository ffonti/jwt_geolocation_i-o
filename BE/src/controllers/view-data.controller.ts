import { PrismaClient } from "@prisma/client";
const { nome, colore } = new PrismaClient();
const prisma = new PrismaClient();

exports.getNomi = async (req, res) => {
  const nomi = await nome.findMany();
  return res.status(200).json({ nomi });
};

exports.getColori = async (req, res) => {
  const colori = await colore.findMany();
  return res.status(200).json({ colori });
};

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      data_nascita: true,
    },
  });
  return res.status(200).json({ users });
};
