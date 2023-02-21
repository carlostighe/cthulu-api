const { Model } = require("objection");

class Weapon extends Model {
  static get tableName() {
    return "weapons";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "regular",
        "hard",
        "extreme",
        "damage",
        "range",
        "attacks",
        "current_ammo",
        "max_ammo",
        "half",
      ],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        regular: { type: "integer" },
        hard: { type: "integer" },
        extreme: { type: "integer" },
        damage: { type: "integer" },
        range: { type: "integer" },
        attacks: { type: "integer" },
        current_ammo: { type: "integer" },
        max_ammo: { type: "integer" },
        half: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    const Character = require("./Character");
    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "weapons.id",
          through: {
            from: "characters_weapons.weapon_id",
            to: "characters_weapons.character_id",
          },
          to: "characters.id",
        },
      },
    };
  }
}

module.exports = Weapon;
