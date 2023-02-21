const { Model } = require("objection");
const Character = require("./Character");
const Phobia = require("./Phobia");

async function getCharacterAndPhobias(characterId) {
  const character = await Character.query()
    .findById(characterId)
    .eager("phobias");

  return character;
}

module.exports = getCharacterAndPhobias;
