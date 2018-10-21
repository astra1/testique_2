'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    score: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Score.associate = function(models) {
    // associations can be defined here
  };
  return Score;
};