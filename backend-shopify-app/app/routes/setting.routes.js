module.exports = app => {
    const Settings = require("../controllers/setting.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", Settings.create);
  
    // Retrieve all Settings
    router.post("/findAll", Settings.findAll);
    router.post("/findBCF", Settings.findBCF);
    // Retrieve all published Settings
    router.get("/published", Settings.findAllPublished);
    router.post("/statesearch", Settings.statesearch);
    router.post("/orderstate", Settings.orderstate);
    router.post("/paystate", Settings.paystate);
    router.post("/delystate", Settings.delystate);
    // Retrieve a single Tutorial with id
    router.post("/findone", Settings.findOne);
  
    // Update a Tutorial with id
    router.post("/update", Settings.update);

    // Update a Tutorial with id
    router.post("/init", Settings.init);
  
    // Delete a Tutorial with id
    router.delete("/deleteone", Settings.delete);
  
    // Create a new Tutorial
    router.delete("/", Settings.deleteAll);

    app.use('/api/settings', router);
  };