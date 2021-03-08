import React, {Component} from 'react';
import LineItem from '../components/LineItem';
import { connect } from 'react-redux';
import {language} from '../language';
import Client from 'shopify-buy';
import '../shared/app.css';
import '../config/global.js';
// const client = Client.buildClient({
//   storefrontAccessToken: global.storefrontAccessToken,
//   domain: global.domain
// });
var client;

var lang_index = 0;
class Cart extends Component {
  constructor(props) {
    super(props);

    this.openCheckout = this.openCheckout.bind(this);
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }
  componentWillMount() {
    client = Client.buildClient({
      storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
      domain: global.domain
    });
    lang_index = this.props.lang_index;

    const shippingAddress = {
      address1: 'a',
      address2: 'a',
      city: 'a',
      company: null,
      country: 'United States',
      firstName: 'Seat',
      lastName: ''+this.props.seatKey,
      phone: '555-625-1199',
      province: 'Kentucky',
      zip: '40202'
    };

    const input = {
      email: "soil_312_1117@yahoo.co.jp",
      shippingAddress:shippingAddress,
      note: ""
    };

    client.checkout.create(input).then((res) => {
      this.setState({
        checkout: res,
      });
    });
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
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

  render() {
    let line_items = this.state.checkout.lineItems.map((line_item) => {
      return (
        <LineItem
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });

    return (
      <div>
          <ul className="Cart__line-items" style={{height:400,overflow:'auto'}}>
            {line_items}
          </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    seatkey:state.seatkey
  };
}
export default connect(mapStateToProps)(Cart);
