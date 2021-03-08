module.exports = app => {
    const seats = require("../controllers/seats.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", seats.create);
  
    // Retrieve all seats
    router.post("/findAll", seats.findAll);
    router.post("/findDeliver", seats.findDeliver);
    router.post("/findAllClient", seats.findAllClient);
  
    // Retrieve all published seats
    router.get("/published", seats.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.post("/delyfind", seats.findOne);

    router.post("/validate", seats.validate);
    router.post("/chefSearch", seats.chefSearch);
    router.post("/delySearch", seats.delySearch);
  
    // Update a Tutorial with id
    //router.put("/update", seats.update);
    router.post("/update", seats.update);
    // Delete a Tutorial with id
    //router.delete("/:id", seats.delete);
    router.post("/delete", seats.delete);
    // Create a new Tutorial
    //router.delete("/", seats.deleteAll);
  
    app.use('/api/seats', router);
  };