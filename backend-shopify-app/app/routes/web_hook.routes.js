module.exports = app => {
    const webHook = require("../controllers/web_hook.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/customersView", webHook.customersView);
    router.post("/customersDelete", webHook.customersDelete);
    router.post("/shopDelete", webHook.shopDelete);

    app.use('/api/hook', router);
  };