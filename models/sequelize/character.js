const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Character = sequelize.define('Character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sanity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    luck: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  const Characteristics = sequelize.define('Characteristics', {
    str: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    int: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    con: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    app: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pow: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    siz: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    edu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moveRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  const Skill = sequelize.define('Skill', {
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    baseVal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    val: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Character.belongsTo(Characteristics, {
    foreignKey: 'characteristicsId',
    as: 'characteristics',
  });
  Characteristics.hasOne(Character, {
    foreignKey: 'characteristicsId',
    as: 'character',
