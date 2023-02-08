const { Model } = require("objection");

class Character extends Model {
  static get tableName() {
    return "characters";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "occupation",
        "age",
        "sex",
        "archetype",
        "residence",
        "birthplace",
        "hp",
        "sanity",
        "luck",
        "mp",
      ],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        occupation: { type: "string" },
        age: { type: "integer" },
        sex: { type: "string" },
        archetype: { type: "string" },
        residence: { type: "string" },
        birthplace: { type: "string" },
        hp: { type: "integer" },
        sanity: { type: "integer" },
        luck: { type: "integer" },
        mp: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Characteristics = require("./Characteristics");
    const Skill = require("./Skill");
    const CharacterSkills = require("./CharacterSkills");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "characters.user_id",
          to: "users.id",
        },
      },

      characteristics: {
        relation: Model.HasOneRelation,
        modelClass: Characteristics,
        join: {
          from: "characters.id",
          to: "characteristics.character_id",
        },
      },

      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: "characters.id",
          to: "skills.id",
          through: {
            modelClass: CharacterSkills,
            from: "character_skills.character_id",
            to: "character_skills.skill_id",
          },
        },
      },
    };
  }
}

module.exports = Character;
