const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

exports.isAdmin = async (req, res) => {
  const id = req.headers["id"];
  await user
    .findUnique({
      where: {
        id: id * 1,
      },
      select: {
        id: true,
        username: true,
      },
    })
    .then((userExists) => {
      if (userExists) {
        const user = {
          id: userExists.id,
          username: userExists.username,
        };
        return res.status(200).json({ user: user });
      } else {
        return res.status(404).json({ msg: "Utente non trovato" });
      }
    });
};
