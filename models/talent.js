const { Model } = require("objection");

class Talent extends Model {
  static get tableName() {
    return "talents";
  }

  static get relationMappings() {
    const Character = require("./Character");

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "talents.id",
          through: {
            from: "characters_talents.talent_id",
            to: "characters_talents.character_id",
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

module.exports = Talent;
