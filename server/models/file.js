'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.hasMany(models.Participant, {foreignKey: 'photo'});
      File.hasMany(models.Participant,{foreignKey:'mandat'})
      File.hasMany(models.Badge, {foreignKey: 'photo'});
    }
  }
  File.init({
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      data: DataTypes.BLOB,
    }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};