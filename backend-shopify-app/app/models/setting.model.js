module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define("setting", {
    license_key: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.TEXT
    },
    language: {
      type: Sequelize.STRING
    }
  });

  return Setting;
};