const { Model } = require("objection");

class Backstory extends Model {
  static get tableName() {
    return "backstories";
  }

  static get relationMappings() {
    const Character = require("./Character");

    return {
      character: {
        relation: Model.HasOneRelation,
        modelClass: Character,
        join: {
          from: "backstories.id",
          to: "characters.backstory_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "personal_description",
        "ideology",
        "significant_people",
        "meaningful_locations",
        "treasured_possessions",
        "injuries",
        "artifacts",
        "encounters",
      ],

      properties: {
        id: { type: "integer" },
        personal_description: { type: "string", minLength: 1, maxLength: 512 },
        ideology: { type: "string", minLength: 1, maxLength: 255 },
        significant_people: { type: "string", minLength: 1, maxLength: 512 },
        meaningful_locations: { type: "string", minLength: 1, maxLength: 512 },
        treasured_possessions: { type: "string", minLength: 1, maxLength: 512 },
        injuries: { type: "string", minLength: 1, maxLength: 512 },
        artifacts: { type: "string", minLength: 1, maxLength: 512 },
        encounters: { type: "string", minLength: 1, maxLength: 512 },
      },
    };
  }
}

module.exports = Backstory;
