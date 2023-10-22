const { db } = require('../lib/db');
const { DataTypes, UUID, UUIDV4 } = require('sequelize');

const Url = db.define('url', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  hash: {
    type: DataTypes.TEXT,
    unique: true,
  },
  generatedUrl: {
    type: DataTypes.TEXT,
    unique: true,
  },
  initialUrl: {
    type: DataTypes.TEXT,
  },
});

Url.sync({ alter: false }).then(() => {
  console.log('Url Model synced');
});

module.exports = Url;
