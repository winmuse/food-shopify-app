

const db = require("../models");
const Pos_registers = db.pos_register;
const User = db.users;
const Op = db.Sequelize.Op;
exports.findAccessToken = (req, res) => {
  Pos_registers.findAll({ where: { shopify_domain: req.body.ShopifyDomain } })
    .then(data => {
      if(data.length>0)
      {
        if(data[0].active === "on")
        {
          res.status(200).send({
            license_key: data[0].id,
            shopifyDomain: data[0].shopify_domain,
            shopifyApiKey: data[0].shopify_api_key,
            PosAppPlan: 'unlimit',
            confirmationUrl: "",
            active:"ACTIVE"
          });
        }
        else
          check_appSubscription(req, res, data[0].shopify_domain, data[0].shopify_access_token, data[0].gid, req.body.PosAppPlan, data[0].id, data[0].shopify_api_key, data[0].pos_app_plan);
      }
      else
      {
        res.status(500).send({
          license_key: "no license"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        license_key: "no license"
      });
    });
};
function check_appSubscription(req, res, shopify_domain, access_token, gid, plan_price, id, shopify_api_key, current_plan_name)
{
  var plan_name = "";
  if(plan_price === 14.99)
    plan_name = "lite";
  else if(plan_price === 44.99)
    plan_name = "standard";
  else if(plan_price === 99.99)
    plan_name = "premium";
  else if(plan_price === 299.99)
    plan_name = "unlimit";
    
  console.log("gid===",gid);
  var request = require("request");
  var options = {
    'method': 'POST',
    'url': 'https://'+shopify_domain+'/admin/api/graphql.json',
    'headers': {
      'Postman-Token': 'cc407456-0d7c-42e5-8517-405c3ec6acaf',
      'X-Shopify-Access-Token': access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query {
          node(id: "`+gid+`") {
            ...on AppSubscription {
              createdAt
              currentPeriodEnd
              id
              name
              status
              test
            }
          }
        }`,
      variables: {}
    })
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    body = JSON.parse(body);

    console.log("check========", body['data']);
    var state = "NONE";
    if(body['data'] != undefined)
      state = body['data']['node']['status'];
    if(state != 'ACTIVE' || plan_name != "")
      create_appSubscription(req, res, shopify_domain, access_token, plan_price, id, shopify_api_key);
    else
    {
      res.status(200).send({
        license_key: id,
        shopifyDomain: shopify_domain,
        shopifyApiKey: shopify_api_key,
        PosAppPlan: current_plan_name,
        confirmationUrl: "",
        active:"ACTIVE"
      });
    }
    //return body['data']['node']['status'];
  });
}
function create_appSubscription(req, res, shopify_domain, access_token, plan_price, id, shopify_api_key)
{
  var plan_name = "";
  if(plan_price === 14.99)
    plan_name = "lite";
  else if(plan_price === 44.99)
    plan_name = "standard";
  else if(plan_price === 99.99)
    plan_name = "premium";
  else if(plan_price === 299.99)
    plan_name = "unlimit";

  if(plan_name == "")
  {
    res.status(500).send({
      license_plan: "no plan"
    });
    return;
  }
  var request = require("request");
  //webhook=======================================
  var options = {
    'method': 'POST',
    'url': 'https://'+shopify_domain+'/admin/api/2020-10/webhooks.json',
    'headers': {
      'X-Shopify-Access-Token': access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"webhook":{"topic":"app/uninstalled","address":"https://app.excuseme.jp/api/hook/customersDelete/","format":"json"}})
  
  };
  request(options, function (error, response) {
    console.log(response.body);
  });

  var options = {
    'method': 'POST',
    'url': 'https://'+shopify_domain+'/admin/api/2020-10/webhooks.json',
    'headers': {
      'X-Shopify-Access-Token': access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"webhook":{"topic":"shop/update","address":"https://app.excuseme.jp/api/hook/shopDelete/","format":"json"}})
  
  };
  request(options, function (error, response) {
    console.log(response.body);
  });

  var options = {
    'method': 'POST',
    'url': 'https://'+shopify_domain+'/admin/api/2020-10/webhooks.json',
    'headers': {
      'X-Shopify-Access-Token': access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"webhook":{"topic":"domains/create","address":"https://app.excuseme.jp/api/hook/customersView/","format":"json"}})
  
  };
  request(options, function (error, response) {
    console.log(response.body);
  });

  //==============================================
  
  //console.log("---",shopify_domain,access_token,plan_price,plan_name);
  var options = {
    'method': 'POST',
    'url': 'https://'+shopify_domain+'/admin/api/graphql.json',
    'headers': {
      'Postman-Token': 'cc407456-0d7c-42e5-8517-405c3ec6acaf',
      'X-Shopify-Access-Token': access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        appSubscriptionCreate(
        name: "`+plan_name+`"
        test:true
        returnUrl: "http://`+shopify_domain+`/admin/apps/excuseme"
        lineItems: [{
          plan: {
            appRecurringPricingDetails: {
                price: { amount: `+plan_price+`, currencyCode: USD }
            }
          }
          }]
        ) {
        userErrors {
          field
          message
        }
        confirmationUrl
        appSubscription {
          id
        }
      }
    }`,
      variables: {}
    })
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //const obj = JSON.parse(response);
    console.log("=====",body);
    body = JSON.parse(body);
    // The Description is:  "descriptive string"
    //console.log("========", body['data']['appSubscriptionCreate']['confirmationUrl']);
    //console.log("========", body['data']['appSubscriptionCreate']['appSubscription']['id']);
    if(body['data'] == undefined)
    {
      res.status(500).send({
        message: "Error create_appSubscription with id=" + shopify_domain
      });
      return;
    }
    const values = {
      confirmation_url: body['data']['appSubscriptionCreate']['confirmationUrl'],
      gid: body['data']['appSubscriptionCreate']['appSubscription']['id'],
      pos_app_plan: plan_name
    };

    Pos_registers.update(values, {
      where: { shopify_domain: shopify_domain }
    })
      .then(num => {
        if (num == 1) {
          console.log("======",req.body);
          res.status(200).send({
            license_key: id,
            shopifyDomain: req.body.ShopifyDomain,
            shopifyApiKey: shopify_api_key,
            PosAppPlan: plan_name,
            confirmationUrl: body['data']['appSubscriptionCreate']['confirmationUrl'],
            active:"PENDING"
          });
        } else {
          res.status(500).send({
            message: "2Error updating plan with id=" + shopify_domain
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "3Error updating plan with id=" + shopify_domain
        });
      });
  });
}
// Create and Save a new Foods
exports.create = (req, res) => {
  if (!req.body.ShopifyDomain) {
    res.status(400).send({
      message: "Please proceed to Login!"
    });
    return;
  }
  // Create a login
  var plan = "";
  if(req.body.PosAppPlan === 14.99)
    plan = "lite"
  else if(req.body.PosAppPlan === 44.99)
    plan = "standard"
  else if(req.body.PosAppPlan === 99.99)
    plan = "premium"
  else if(req.body.PosAppPlan === 299.99)
    plan = "unlimit"
  const values = {
    shopify_domain: req.body.ShopifyDomain,
    shopify_api_key: req.body.ShopifyApiKey,
    pos_app_price: req.body.PosAppPlan,
    payment_card_num: req.body.PaymentCardnum,
    pos_app_plan: plan,
    date: formatDate(new Date())
  };
  Pos_registers.findAll({ where: { shopify_domain: req.body.ShopifyDomain } })
    .then(data => {
      //res.send(data);
      if(data.length==0)
      {
        // res.status(500).send({
        //   license_key: "no license"
        // });
       // create_data(values);
       if(pay(req.body.PosAppPlan, req.body.PaymentCardnum))
       {
          Pos_registers.create(values)
          .then(reg => {
            res.status(200).send({
              license_key: reg.id,
              shopifyApiKey: reg.shopify_domain,
              shopifyDomain: reg.shopify_api_key,
              PosAppPlan: plan
            });
          })
          .catch(err => {
            res.status(400).send("Failed to store to database");
          });
       }
      }
      else{
        console.log("aaa-",data);
        if(useDate(data[0].date))
        {
          //res.send(data);
          if(pay(req.body.PosAppPlan, req.body.PaymentCardnum))
          {
            Pos_registers.update(values, {
              where: { id: data[0].id }
            })
              .then(num => {
                if (num == 1) {
                  res.status(200).send({
                    license_key: data[0].id,
                    shopifyDomain: req.body.ShopifyDomain,
                    shopifyApiKey: data[0].shopify_api_key,
                    PosAppPlan: plan
                  });
                } else {
                  res.status(500).send({
                    message: "4Error updating plan with id=" + id
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "5Error updating plan with id=" + id
                });
              });
          }
          else
          {
            res.status(200).send({
              license_key: data[0].id,
              shopifyDomain: data[0].shopify_domain,
              shopifyApiKey: data[0].shopify_api_key,
              PosAppPlan: data[0].pos_app_plan
            });
          }
        }
        else
        {
          // res.status(500).send({
          //   license_key: "no license"
          // });
          if(pay(req.body.PosAppPlan, req.body.PaymentCardnum))
          {
            Pos_registers.create(values)
            .then(reg => {
              res.status(200).send({
                license_key: reg.id,
                shopifyDomain: reg.shopify_domain,
                shopifyApiKey: reg.shopify_api_key,
                PosAppPlan: reg.pos_app_plan
              });
            })
            .catch(err => {
              res.status(400).send("Failed to store to database");
            });
          }
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        license_key: "no license"
      });
    });
};
function useDate(date)
{
  var use_date = new Date(date);
  var current_date = new Date();
  if(current_date.getTime() - use_date.getTime()<2736568397)
    return true;
  else
    return false;
}
function create_data(values){
  Pos_registers.create(values)
    .then(reg => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send("Failed to store to database");
    });
}
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
function pay(plan, cardnum)
{
  if(plan === undefined || cardnum === "")
    return false;
  return true;
}
exports.rating = (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  User.findAll({ where: { id: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + email
      });
    });
};

exports.cheffoodlist = (req, res) => {
  const id = req.body.id;
  Foods.findAll({ where: { chef_id: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// per food search start
exports.fooddetail = (req, resp) => {
  const food_id = req.body.food_id;
  Foods.findAll({ where: { id: food_id } })
    .then(data => {
      resp.send(data);
    })
    .catch(err => {
      resp.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// per food search end

// Retrieve all Foods from the database.
exports.findAll = (req, res) => {
  const title = req.body.title;
  var condition = title ? { cuisine_name: { [Op.like]: `%${title}%` } } : null;

  Foods.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Foods."
      });
    });
};

// Find a single Foods with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Foods.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Foods with id=" + id
      });
    });
};

// Update a Foods by the id in the request
exports.update = (req, res) => {
  const food_id = req.body.food_id;

  Foods.update(req.body, {
    where: { id: food_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Foods was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Foods with id=${id}. Maybe Foods was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Foods with id=" + id
      });
    });
};
// Delete a Foods with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Foods.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Foods was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Foods with id=${id}. Maybe Foods was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Foods with id=" + id
      });
    });
};

// Delete all Foods from the database.
exports.deleteAll = (req, res) => {
  Foods.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Foods were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Foods."
      });
    });
};

// Find all published Foods
exports.findAllPublished = (req, res) => {
  Foods.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Foods."
      });
    });
};


//File upload
exports.upload = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  })
}