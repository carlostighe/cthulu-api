const { Model } = require("objection");

class Phobia extends Model {
  static get tableName() {
    return "phobias";
  }

  static get relationMappings() {
    const Character = require("./Character");

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "phobias.id",
          through: {
            from: "characters_phobias.phobia_id",
            to: "characters_phobias.character_id",
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

module.exports = Phobia;
