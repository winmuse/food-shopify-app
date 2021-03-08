const db = require("../models");
const Seat = db.seats;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.username) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }
  // Create a User
  const seat = {
    license_key: req.body.license_key,
    seat: req.body.seat,
    text: req.body.text,
    email: req.body.email,
    checkoutId: req.body.checkoutId,
    flag: req.body.flag
  };

  // Save User in the database
  Seat.create(seat)
    .then(reg => {
      console.log("aaa-",reg);
      res.send(reg);
    })
    .catch(err => {
      res.status(400).send("Failed to store to database");
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.body.license_key;

  Seat.findAll({ where: { license_key: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findAllClient = (req, res) => {
  const title = req.body.title;
  var condition = title ? { name: { [Op.like]: `%${title}%` }, autho_chef: 1 } : { autho_buyer: 1 };

  Seat.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findDeliver = (req, res) => {
  const title = req.body.title;
  var condition = title ? { name: { [Op.like]: `%${title}%` }, autho_delivery: 1 } : { autho_delivery: 1 };

  Seat.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};


exports.chefSearch = (req, res) => {
  var condition = req.body.autho_chef;

  Seat.findAll({ where: { autho_chef: condition } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.delySearch = (req, res) => {
  var condition = req.body.autho_delivery;

  Seat.findAll({ where: { autho_delivery: condition } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.validate = (req, res, next) => {
  const pass = req.body.pass;
  const email = req.body.email;
  Seat.findAll({ where: { pass: pass, email: email } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// Find a single User with an id
exports.findOne = (req, ress) => {
  const id = req.body.id;
  Seat.findAll({ where: { id: id } })
    .then(data => {
      ress.send(data);
    })
    .catch(err => {
      ress.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  // const id = req.params.id;
  const id = req.body.id
  Seat.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Seat.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Seat.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  const email = req.body.email;
  Seat.findAll({ where: { email: email } })
    .then(data => {
      res.send(email);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};