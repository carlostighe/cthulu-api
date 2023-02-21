const { Model } = require("objection");

class Skill extends Model {
  static get tableName() {
    return "skills";
  }

  static get relationMappings() {
    const Character = require("./Character");

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "skills.id",
          through: {
            from: "character_skills.skill_id",
            to: "character_skills.character_id",
          },
          to: "characters.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["checked", "base_val", "val", "name"],
      properties: {
        id: { type: "integer" },
        checked: { type: "boolean" },
        base_val: { type: "integer" },
        val: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Skill;
