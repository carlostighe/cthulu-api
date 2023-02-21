const { Model } = require("objection");

class Trait extends Model {
  static get tableName() {
    return "traits";
  }

  static get relationMappings() {
    const Character = require("./Character");

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "traits.id",
          through: {
            from: "characters_traits.trait_id",
            to: "characters_traits.character_id",
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

module.exports = Trait;
