const { Model } = require("objection");

class Mania extends Model {
  static get tableName() {
    return "manias";
  }

  static get relationMappings() {
    const Character = require("./Character");

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "manias.id",
          through: {
            from: "characters_manias.mania_id",
            to: "characters_manias.character_id",
          },
          to: "characters.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "description"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Mania;
