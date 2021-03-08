import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import Products from '../components/Products';
import Cart from '../components/Cart';
import CartModal from '../components/CartModal';
import Client from 'shopify-buy';
import '../shared/app.css';
import { connect } from 'react-redux';
import {ChangeLicense} from '../reducers/action';
import {language} from '../language';
import {ChangeSeatkey} from '../reducers/action';
//import firebaseAction from '../firebaseAction';

import {genQRInfo} from "../qrcode/actions";
import '../config/global.js';
// const client = Client.buildClient({
//   storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
//   domain: global.domain
// });
// const client = Client.buildClient({
//   storefrontAccessToken: '442393f9c888d0530b68bdae37f9b13b',
//   domain: 'mymymy1234.myshopify.com'
// });
var client;
const firebaseUpdate = 0;

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isCartOpen: false,
      isCartModalOpen: false,
      checkout: { lineItems: [] },
      products: [],
      collections: [],
      shop: {},
      orderNum : 1,
      checkoutIdUrl : "",
      seatNumUrl : "",
      seatKeyUrl : ""
    };
    this.onPressedSearch = this.onPressedSearch.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartModalClose = this.handleCartModalClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.updateOrderNum = this.updateOrderNum.bind(this);
  }

  componentWillMount() {

    var str = window.location.href;
    var len = str.split("/").length;
    var str_seatKeyUrl = str.split("/")[len-1];

    if(str_seatKeyUrl.split("&").length == 2)
    {
      global.domain = str_seatKeyUrl.split("&")[1];
      str_seatKeyUrl = str_seatKeyUrl.split("&")[0];
      this.props.genQRInfo(str);

      fetch(global.api_domain+"/api/posApp/findAccessToken", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
            ShopifyDomain: global.domain,
            PosAppPlan: 0,
        })
        })
        .then(response => response.json())
        .then(response => {
            console.log("-----",response);
            if(response.license_key === "no license" || response.license_key === undefined)
            {
                if(response.license_plan === "no plan")
                {
                    this.props.history.push("/register");
                }
                else
                  this.props.history.push("/");
            }
            else
            {
                if(response.active != "ACTIVE")
                {
                    this.props.history.push("/register");
                }
                else
                {
                    global.domain = response.shopifyDomain;
                    global.storefrontAccessToken = response.shopifyApiKey;
                    global.price_list = response.PosAppPlan;
                    this.props.ChangeLicense(response.license_key);
                    this.props.license_key = response.license_key;
                    this.props.genQRInfo(str);
                    this.init_products(str_seatKeyUrl);
                    this.props.history.push("/products/"+str_seatKeyUrl);
                }
            }
        })
        .catch(err => {
          this.init_products(str_seatKeyUrl);
        });

      // this.props.ChangeLicense(12);
      // this.props.license_key = 12;
      // global.storefrontAccessToken = '8ccd8cd311d8f962901403779d1a9670';
      // global.price_list = 'premium';
      console.log("-------------",global.domain,str_seatKeyUrl);
    }
    else
    {
      this.props.genQRInfo(str+"&"+global.domain);
      this.init_products(str_seatKeyUrl);
    }
  }
  init_products(str_seatKeyUrl){

    client = Client.buildClient({
      storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
      domain: global.domain
    });
    if(this.props.location.state !== undefined)
      this.onFireBaseLoad(this.props.location.state.seatOrdernum,this.props.location.state.seatKey,this.props.location.state.checkoutId,this.props.location.state.isCartOpen);
    else
    {
      fetch(global.api_domain+"/api/seats/findAll", {
        "method": "POST",
          "headers": {
              "content-type": "application/json",
              "accept": "application/json"
          },
          "body": JSON.stringify({
            license_key:this.props.license_key
          })
        })
        .then(response => response.json())
        .then(response => {
          for(var ii = 0; ii< response.length; ii++)
          {
            if(response[ii].id.toString() === str_seatKeyUrl)
            {
              this.setState({
                checkoutIdUrl:response[ii].checkoutId,
                seatNumUrl:response[ii].seat,
                seatKeyUrl:response[ii].id
              })
              //if(firebaseUpdate === 0)
              {
                var ordernum = response[ii].seat;

                if(response[ii].seat === undefined || response[ii].seat === "")
                {
                  //firebaseUpdate = 1;
                  //firebaseAction.updateSeat(response[ii].key, "1");
                  fetch(global.api_domain+"/api/seats/update", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({
                      seat:"1",
                      id: response[ii].id
                    })
                  })
                  //.then(response => response.json())
                  .then(response => {
                  })
                  .catch(err => {
                      console.log(err);
                  });
                  ordernum=1;
                }
                else
                {
                  ordernum = parseInt(response[ii].seat);
                  ordernum++;
                  //firebaseUpdate = 1;
                  //firebaseAction.updateSeat(response[ii].key, ordernum);
                  fetch(global.api_domain+"/api/seats/update", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({
                      seat:ordernum,
                      id: response[ii].id
                    })
                  })
                  //.then(response => response.json())
                  .then(response => {
                  })
                  .catch(err => {
                      console.log(err);
                  });
                }
                this.setState({
                  orderNum: ordernum,
                });
              }
              this.onFireBaseLoad(response[ii].seat,response[ii].id,response[ii].checkoutId,false);
            }
          }
        })
        .catch(err => {
            console.log(err);
        });
      }
  }
  onFireBaseLoad(seatNumUrl,seatKeyUrl,checkoutIdUrl,isCartOpen){
    this.setState({
      isCartOpen: isCartOpen,
      checkoutIdUrl:checkoutIdUrl,
      seatNumUrl:seatNumUrl,
      seatKeyUrl:seatKeyUrl
    });
    this.props.ChangeSeatkey(seatNumUrl);

    const shippingAddress = {
      address1: 'a',
      address2: 'a',
      city: 'a',
      company: null,
      country: 'United States',
      firstName: 'Seat',
      lastName: '0',
      phone: '555-625-1199',
      province: 'Kentucky',
      zip: '40202'
    };
    // const shippingAddress = {
    //   address1: '大分県大分市羽屋4-1-A組',
    //   address2: '大分県臼杵市臼杵洲崎四丁目１組',
    //   city: 'Kawamata-machi',
    //   company: null,
    //   country: 'Japan',
    //   firstName: 'Bob',
    //   lastName: 'Norman',
    //   phone: '960-1426',
    //   province: 'Kyushu-Okinawa Region',
    //   zip: '07308'
    // };
    const input = {
      email: "soil_312_1117@yahoo.co.jp",
      shippingAddress:shippingAddress,
      note: ""
    };

    client.checkout.fetch(checkoutIdUrl).then((res) => {
      // Do something with the checkout
      this.setState({
        checkout: res,
      });
     })
     .catch(error=>{
      client.checkout.create(input).then((res) => {
        this.setState({
          checkout: res,
        });
        //firebaseAction.updateCheckoutID(seatKeyUrl, res.id);
        fetch(global.api_domain+"/api/seats/update", {
          "method": "POST",
          "headers": {
              "content-type": "application/json",
              "accept": "application/json"
          },
          "body": JSON.stringify({
            checkoutId:res.id,
            id: seatKeyUrl
          })
        })
        //.then(response => response.json())
        .then(response => {
        })
        .catch(err => {
            console.log(err);
        });
      });
     });

    client.collection.fetchAll().then((res) => {
      this.setState({
        collections: res,
      });
    });
    client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });

    client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  onPressedSearch(event){
    //Blue Silk Tuxedo
    const query = {
      query: 'title:="'+event.target.value+'"',
      sortBy: 'title'
    };

    if(event.target.value === "")
    {
      client.product.fetchAll().then((res) => {
        this.setState({
          products: res,
        });
      });
    }
    else
    {
      client.product.fetchQuery(query).then((res) => {
        this.setState({
          products: res,
        });
      });
    }
  }

  opencart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = this.state.checkout.id

    return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  mouseDown(para){
    document.getElementById(para).style.border = "5px solid red";
  }

  mouseUp(para){
    document.getElementById(para).style.border = "3px solid #f9bdb5";
  }

  addVariantToCart(variantId, quantity,flag) {

    if((global.price_list==='standard') || (global.price_list==='premium') || (global.price_list==='unlimit'))
    {
      if(flag==="display"){
        this.setState({
          isCartOpen: true,
        });
      }
      else
      {
        this.setState({
          isCartModalOpen: true,
        });
      }
      const customAttributes = [{ key: 'order', value: this.state.orderNum+"/0" }];
      const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10), customAttributes: customAttributes }]
      const checkoutId = this.state.checkout.id

      return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
        this.setState({
          checkout: res,
        });
      });
    }
    else
    {
      alert(language[1].seat_price_alert);
    }
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]

    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }
  updateOrderNum() {

    this.setState({
      orderNum: this.state.orderNum + 1,
      isCartModalOpen: false,
    });

  }
  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }
  handleCartModalClose() {
    this.setState({
      isCartModalOpen: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Products
          products={this.state.products}
          collections={this.state.collections}
          client={client}
          addVariantToCart={this.addVariantToCart}
          onPressedSearch={this.onPressedSearch}
          opencart={this.opencart}
          mouseDown={this.mouseDown}
          mouseUp={this.mouseUp}
          fire_seatnum={this.state.seatNumUrl}
          fire_seatkey={this.state.seatKeyUrl}
          fire_seatordernum={this.state.orderNum}
          fire_checkoutId={this.state.checkoutIdUrl}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          seatKey={this.state.seatKeyUrl}
          updateOrderNum={this.updateOrderNum}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
          fire_seatnum={this.state.seatNumUrl}
          fire_seatkey={this.state.seatKeyUrl}
          fire_seatordernum={this.state.orderNum}
          fire_checkoutId={this.state.checkoutIdUrl}
        />
        <CartModal
          checkout={this.state.checkout}
          isCartModalOpen={this.state.isCartModalOpen}
          updateOrderNum={this.updateOrderNum}
          ordernum={this.state.orderNum}
          handleCartModalClose={this.handleCartModalClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    license_key: state.license,
  };
}
const mapDispatchToProps = {
  ChangeSeatkey,
  genQRInfo,
  ChangeLicense
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
