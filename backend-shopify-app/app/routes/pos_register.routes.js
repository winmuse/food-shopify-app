module.exports = app => {
    const pos_register = require("../controllers/pos_register.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", pos_register.create);
    router.post("/findAccessToken", pos_register.findAccessToken);
  
    // Retrieve all pos_register
    router.post("/findAll", pos_register.findAll);
  
    // Retrieve all published Foods
    router.get("/published", pos_register.findAllPublished);
    router.post("/rating", pos_register.rating);
    router.post("/cheffoodlist", pos_register.cheffoodlist);
    router.post("/fooddetail", pos_register.fooddetail);
    // Retrieve a single Tutorial with id
    router.get("/:id", pos_register.findOne);
  
    // Update a Tutorial with id
    router.put("/update", pos_register.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", pos_register.delete);
  
    // Create a new Tutorial
    router.delete("/", pos_register.deleteAll);

    router.post("/upload",pos_register.upload);
  
    app.use('/api/posApp', router);
  };
