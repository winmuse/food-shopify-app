const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

// app.use(express.static(__dirname+'/public'));
app.use(express.static(path.join(__dirname, 'build')));

var multer = require('multer');
app.use(cors());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
})

// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});
app.get("/home*", (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:3002' });
});
app.get("/auth*", (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:3002' });
});
const db = require("./app/models");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync();

require("./app/routes/seats.routes")(app);
require("./app/routes/pos_register.routes")(app);
require("./app/routes/setting.routes")(app);
require("./app/routes/web_hook.routes")(app);

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.send(req.file)
    })
});

app.post('/fetchImage/:file(*)', function (req, res) {
    let file = req.params.file;
    let fileLocation = path.join('../public/', file);
    //res.send({image: fileLocation});
    // res.sendFile(`${fileLocation}`)
    res.sendFile(path.join(__dirname, '/public/', `${fileLocation}`));
})

const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
};

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/${req.url}`));
    }
    else
    {
      res.sendFile(path.join(__dirname+'/build/index.html'));
    }
});
const port = normalizePort("5000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);






require('isomorphic-fetch');
const mysql = require('mysql');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config();

const portAuth = parseInt(process.env.PORT, 10) || 3002;
const devAuth = process.env.NODE_ENV !== 'production';
const appAuth = next({ devAuth });

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

appAuth.prepare().then(() => {
  const serverAuth = new Koa();
  serverAuth.use(session({ sameSite: 'none', secure: true }, serverAuth));
  serverAuth.keys = [SHOPIFY_API_SECRET_KEY];
  serverAuth.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      accessMode: 'offline',
      scopes: ['unauthenticated_read_product_listings,unauthenticated_write_checkouts,unauthenticated_write_customers,unauthenticated_read_customer_tags,unauthenticated_read_content,unauthenticated_read_product_tags'],
      // scopes: ['unauthenticated_read_collection_listings,unauthenticated_read_product_listings, unauthenticated_write_checkouts,unauthenticated_write_customers, unauthenticated_read_content'],
      //scopes: ['read_content,read_products,read_product_listings,read_customers,read_draft_orders,read_inventory,read_locations,read_script_tags,read_fulfillments,read_assigned_fulfillment_orders,read_analytics,read_checkouts,read_price_rules,read_discounts,read_shopify_payments_payouts,read_translations,read_locales'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        console.log("createShopifyAuth-------------------------------------",ctx.session);

        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "app_excuseme"
        });
        con.connect(function(err) {
          if (err) return;
          console.log("Connected!");
          var sql = "select * FROM registers WHERE shopify_domain = '"+shop+"'";
          var rows = 0;
          con.query(sql, function (err, result) {
            if (err) return;
            console.log("select ---------------" , result.length);
            rows = result.length;
            if(rows > 0)
            {
              var request = require("request");

              var options = { method: 'POST',
                url: 'https://'+shop+'/admin/storefront_access_tokens.json',
                headers:
                { 'Postman-Token': 'cc407456-0d7c-42e5-8517-405c3ec6acaf',
                  'Content-Type': 'application/json',
                  'X-Shopify-Access-Token': result[0].shopify_access_token },
                body: { storefront_access_token: { title: 'excuseme' } },
                json: true };

              request(options, function (error, response, body) {
                console.log("storefront check-----",body);
                if (error) throw new Error(error);

                if(body.storefront_access_token == undefined)
                {
                  sql = "DELETE FROM registers WHERE shopify_domain = '"+shop+"'";
                  con.query(sql, function (err, result) {
                    if (err) return;
                    console.log("Number of records deleted: " + result.affectedRows);
                    rows = 0;

                    options = { method: 'POST',
                    url: 'https://'+shop+'/admin/storefront_access_tokens.json',
                    headers:
                    { 'Postman-Token': 'cc407456-0d7c-42e5-8517-405c3ec6acaf',
                      'Content-Type': 'application/json',
                      'X-Shopify-Access-Token': accessToken },
                    body: { storefront_access_token: { title: 'excuseme' } },
                    json: true };

                    request(options, function (error, response, body) {
                      if (error) throw new Error(error);

                      console.log("===========",body.storefront_access_token);
                      if(body.storefront_access_token == undefined)
                        return ;
                      var storefront_access_token  = body.storefront_access_token.access_token;
                      console.log("===========",storefront_access_token);
                      var con = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        password: "",
                        database: "app_excuseme"
                      });
                      con.connect(function(err) {
                        if (err) return;
                        console.log("Connected!");
                        var sql = "select * FROM registers WHERE shopify_domain = '"+shop+"'";
                        var rows = 0;
                        con.query(sql, function (err, result) {
                          if (err) return;
                          console.log("select ---------------" , result.length);
                          rows = result.length;
                          //if(rows == 0)
                          {
                            sql = "DELETE FROM registers WHERE shopify_domain = '"+shop+"'";
                            con.query(sql, function (err, result) {
                              if (err) return;
                              console.log("Number of records deleted: " + result.affectedRows);
                            });
                            sql = "insert into registers(shopify_domain, shopify_api_key, shopify_access_token) values ('"+shop+"', '"+storefront_access_token+"', '"+accessToken+"')";
                            con.query(sql, function (err, result) {
                              if (err) return;
                              console.log("Number of records inserted: " + result.affectedRows);
                            });
                          }
                        });
                      });
                    });
                  });
                }
              });
            }
            else
            {
              var request = require("request");

              var options = { method: 'POST',
              url: 'https://'+shop+'/admin/storefront_access_tokens.json',
              headers:
              { 'Postman-Token': 'cc407456-0d7c-42e5-8517-405c3ec6acaf',
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken },
              body: { storefront_access_token: { title: 'excuseme' } },
              json: true };

              request(options, function (error, response, body) {
                if (error) throw new Error(error);

                console.log("===========",body.storefront_access_token);
                if(body.storefront_access_token == undefined)
                  return ;
                var storefront_access_token  = body.storefront_access_token.access_token;
                console.log("===========",storefront_access_token);
                var con = mysql.createConnection({
                  host: "localhost",
                  user: "root",
                  password: "",
                  database: "app_excuseme"
                });
                con.connect(function(err) {
                  if (err) return;
                  console.log("Connected!");
                  var sql = "select * FROM registers WHERE shopify_domain = '"+shop+"'";
                  var rows = 0;
                  con.query(sql, function (err, result) {
                    if (err) return;
                    console.log("select ---------------" , result.length);
                    rows = result.length;
                    //if(rows == 0)
                    {
                      sql = "DELETE FROM registers WHERE shopify_domain = '"+shop+"'";
                      con.query(sql, function (err, result) {
                        if (err) return;
                        console.log("Number of records deleted: " + result.affectedRows);
                      });
                      sql = "insert into registers(shopify_domain, shopify_api_key, shopify_access_token) values ('"+shop+"', '"+storefront_access_token+"', '"+accessToken+"')";
                      con.query(sql, function (err, result) {
                        if (err) return;
                        console.log("Number of records inserted: " + result.affectedRows);
                      });
                    }
                  });
                });
              });
            }
          });
        });
        ctx.redirect('/');
      },
    }),
  );

  // serverAuth.use(
  //   createShopifyAuth({
  //     apiKey: SHOPIFY_API_KEY,
  //     secret: SHOPIFY_API_SECRET_KEY,
  //     accessMode: 'offline',
  //     scopes: ['unauthenticated_read_product_listings,unauthenticated_write_checkouts,unauthenticated_write_customers,unauthenticated_read_customer_tags,unauthenticated_read_content,unauthenticated_read_product_tags'],
  //     // scopes: ['unauthenticated_read_collection_listings,unauthenticated_read_product_listings, unauthenticated_write_checkouts,unauthenticated_write_customers, unauthenticated_read_content'],
  //     //scopes: ['read_content,read_products,read_product_listings,read_customers,read_draft_orders,read_inventory,read_locations,read_script_tags,read_fulfillments,read_assigned_fulfillment_orders,read_analytics,read_checkouts,read_price_rules,read_discounts,read_shopify_payments_payouts,read_translations,read_locales'],
  //     afterAuth(ctx) {
  //       const { shop, accessToken } = ctx.session;
  //       console.log("createShopifyAuth-------------------------------------",ctx.session);
  //       var request = require("request");

  //       var options = { method: 'POST',
  //         url: 'https://'+shop+'/admin/storefront_access_tokens.json',
  //         headers: 
  //         { 'Postman-Token': 'cc407456-0d7c-42e5-8517-405c3ec6acaf',
  //           'Content-Type': 'application/json',
  //           'X-Shopify-Access-Token': accessToken },
  //         body: { storefront_access_token: { title: 'excuseme' } },
  //         json: true };

  //       request(options, function (error, response, body) {
  //         if (error) throw new Error(error);

  //         console.log("===========",body.storefront_access_token);
  //         if(body.storefront_access_token == undefined)
  //           return ;
  //         var storefront_access_token  = body.storefront_access_token.access_token;
  //         console.log("===========",storefront_access_token);
  //         var con = mysql.createConnection({
  //           host: "localhost",
  //           user: "root",
  //           password: "",
  //           database: "app_excuseme"
  //         });
  //         con.connect(function(err) {
  //           if (err) return;
  //           console.log("Connected!");
  //           var sql = "select * FROM registers WHERE shopify_domain = '"+shop+"'";
  //           var rows = 0;
  //           con.query(sql, function (err, result) {
  //             if (err) return;
  //             console.log("select ---------------" , result.length);
  //             rows = result.length;
  //             if(rows == 0)
  //             {
  //               sql = "DELETE FROM registers WHERE shopify_domain = '"+shop+"'";
  //               con.query(sql, function (err, result) {
  //                 if (err) return;
  //                 console.log("Number of records deleted: " + result.affectedRows);
  //               });
  //               sql = "insert into registers(shopify_domain, shopify_api_key, shopify_access_token) values ('"+shop+"', '"+storefront_access_token+"', '"+accessToken+"')";
  //               con.query(sql, function (err, result) {
  //                 if (err) return;
  //                 console.log("Number of records inserted: " + result.affectedRows);
  //               });
  //             }
  //           });
  //         });
  //       });
  //       ctx.redirect('/');
  //     },
  //   }),
  // );
  // server.use((ctx,next)=>{
  //   console.log(ctx.request.url.length);
  //   ctx.redirect('/');
  // });
  // router.get('/home', (ctx) => {
  //   console.log(ctx.route);
  //   //ctx.redirect('/');
  // });
  serverAuth.use(verifyRequest());
  serverAuth.use(async (ctx) => {
    // console.log("wwwwwwwwww",ctx.path);
    // //ctx.redirect('/');
    // await handle(ctx.req, ctx.res);
    // ctx.respond = false;
    // ctx.res.statusCode = 200;
    //console.log("-----",ctx);
    ctx.redirect('/');
  });
  // server.use(router.routes())
  // .use(router.allowedMethods());
  serverAuth.listen(portAuth, () => {
    console.log(`> Ready on http://localhost:${portAuth}`);
  });
});
