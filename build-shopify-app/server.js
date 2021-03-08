require('isomorphic-fetch');
const mysql = require('mysql');
const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const assert = require('assert');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3002;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "shopify_pos"
// });



app.prepare().then(() => {
  const server = new Koa();
   server.use(session({ sameSite: 'none', secure: true }, server));
   server.keys = [SHOPIFY_API_SECRET_KEY];

   server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      accessMode: 'offline',
      scopes: ['unauthenticated_read_product_listings,unauthenticated_write_checkouts,unauthenticated_write_customers,unauthenticated_read_customer_tags,unauthenticated_read_content,unauthenticated_read_product_tags'],
      // scopes: ['unauthenticated_read_collection_listings,unauthenticated_read_product_listings, unauthenticated_write_checkouts,unauthenticated_write_customers, unauthenticated_read_content'],
      //scopes: ['read_content,read_products,read_product_listings,read_customers,read_draft_orders,read_inventory,read_locations,read_script_tags,read_fulfillments,read_assigned_fulfillment_orders,read_analytics,read_checkouts,read_price_rules,read_discounts,read_shopify_payments_payouts,read_translations,read_locales'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        console.log("-------------------------------------",ctx.session);
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
              if(rows == 0)
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
        ctx.redirect('/');
      },
    }),
  );
  // server.use((ctx,next)=>{
  //   console.log(ctx.request.url.length);
  //   ctx.redirect('/');
  // });
  // router.get('/home', (ctx) => {
  //   console.log(ctx.route);
  //   //ctx.redirect('/');
  // });
  server.use(verifyRequest());
  server.use(async (ctx) => {
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
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
