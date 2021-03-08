module.exports = (sequelize, Sequelize) => {
    const pos_register = sequelize.define("register", {
      shopify_domain: {
        type: Sequelize.STRING
      },
      shopify_api_key: {
        type: Sequelize.STRING
      },
      shopify_access_token: {
        type: Sequelize.STRING
      },
      pos_app_plan: {
        type: Sequelize.STRING
      },
      confirmation_url: {
        type: Sequelize.STRING
      },
      gid: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.STRING
      }
    });
  
    return pos_register;
  };