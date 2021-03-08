const db = require("../models");
const Settings = db.setting;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Settings
exports.create = (req, res) => {
  // if (!req.body.license_key) {
  //   res.status(400).send({
  //     message: "Please proceed to Login!"
  //   });
  //   return;
  // }
  // Create a Settings
  const Setting = {
    license_key: req.body.license_key,
    value: req.body.value,
    password: req.body.password,
    img: req.body.img,
    language: req.body.language
  };

  Settings.create(Setting)
    .then(data => {
      console.log("aaa",data);
      res.send(data);
    })
    .catch(err => {
      res.status(400).send("Failed to store to database");
    });
};

// Retrieve all Settings from the database.
exports.findAll = (req, res) => {
  console.log("setting-findall");

  var id = req.body.license_key;
  Settings.findAll({ where: { license_key: id} })
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

// Update a Settings by the id in the request
exports.init = (req, res) => {
  const license_key = req.body.license_key;
  console.log("aaa-",license_key);
  Settings.update(req.body, {
    where: { license_key: license_key }
  })
    .then(num => {
      if (num == 1) {
        res.sendStatus(200);
      } else {
        res.send({
          message: `Cannot update Settings with id=${license_key}. Maybe Settings was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Settings with id=" + license_key
      });
    });
};
// Update a Settings by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  Settings.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.sendStatus(200);
      } else {
        res.send({
          message: `Cannot update Settings with id=${id}. Maybe Settings was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Settings with id=" + id
      });
    });
};
// state search start
exports.statesearch = (req, res) => {
  const id = req.body.id;
  Settings.findAll({ where: { buyer_id: id, check_state: 0 } })//, check_state: 1
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// state search end

// Settings state start
exports.orderstate = (req, res) => {
  const id = req.body.id;
  Settings.findAll({ where: { chef_id: id, delivery_state: [1, 2, 3, 4, 5] } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// Settings satate end

// Settings state start
exports.paystate = (req, res) => {
  const id = req.body.id;
  Settings.findAll({ where: { buyer_id: id, pay_state: 1, delivery_state: [1, 2, 3, 4] } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// Settings satate end

// Settings state start
exports.delystate = (req, res) => {
  const id = req.body.id;
  Settings.findAll({
    where: {
      delivery_id: id,
      pay_state: 1,
      delivery_state: [1, 2, 3]
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// Settings satate end

// search with buyer_id and chef_id and pay_state start
exports.findBCF = (req, respon) => {
  var bid = req.body.buyer_id;
  var cid = req.body.chef_id;
  var fid = req.body.food_id;

  Settings.findAll({ where: { buyer_id: bid, chef_id: cid, cuisine_id: fid, check_state: 0 } })
    .then(data => {
      respon.send(data);
    })
    .catch(err => {
      respon.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
// search with buyer_id and chef_id and pay_state end


// Find a single Settings with an id
exports.findOne = (req, resss) => {
  var condition = req.body.id;

  Settings.findAll({ where: { id: condition } })
    .then(data => {
      resss.send(data);
    })
    .catch(err => {
      resss.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};


// Delete a Settings with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Settings.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Settings was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Settings with id=${id}. Maybe Settings was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Settings with id=" + id
      });
    });
};

// Delete all Settings from the database.
exports.deleteAll = (req, res) => {
  Settings.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Settings were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Settings."
      });
    });
};

// Find all published Settings
exports.findAllPublished = (req, res) => {
  Settings.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Settings."
      });
    });
};

