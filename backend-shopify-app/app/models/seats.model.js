module.exports = (sequelize, Sequelize) => {
    const seats = sequelize.define("seats", {
      license_key: {
        type: Sequelize.STRING
      },
      seat: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      checkoutId: {
        type: Sequelize.STRING
      },
      flag: {
        type: Sequelize.INTEGER
      }
    });
    return seats;
  };