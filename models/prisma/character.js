const { prisma } = require("../generated/prisma-client");

async function createCharacter(data) {
  const {
    name,
    occupation,
    age,
    sex,
    archetype,
    residence,
    birthplace,
    HP,
    sanity,
    luck,
    MP,
    characteristics,
    skills,
  } = data;

  const newCharacter = await prisma.createCharacter({
    name,
    occupation,
    age,
    sex,
    archetype,
    residence,
    birthplace,
    HP,
    sanity,
    luck,
    MP,
    characteristics: {
      create: {
        str: characteristics.str,
        dex: characteristics.dex,
        int: characteristics.int,
        con: characteristics.con,
        app: characteristics.app,
        pow: characteristics.pow,
        siz: characteristics.siz,
        edu: characteristics.edu,
        moveRate: characteristics.moveRate,
      },
    },
    skills: {
      connect: skills.map((skill) => ({ id: skill })),
    },
  });

  return newCharacter;
}

module.exports = {
  createCharacter,
};
