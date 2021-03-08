import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Client from 'shopify-buy';
import '../shared/app.css';
import Switch from "react-switch";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import '../config/global.js';
// const client = Client.buildClient({
//   storefrontAccessToken: global.storefrontAccessToken,
//   domain: global.domain
// });
var client;

function App() {
    const history = useHistory();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkout, setCheckout] = useState([]);
    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState({});
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        client = Client.buildClient({
            storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
            domain: global.domain
          });
        client.checkout.create().then((res) => {
            setCheckout(res);
        });

        client.product.fetchAll().then((res) => {
            setProducts(res)
        });

        client.shop.fetchInfo().then((res) => {
            setShop(res)
        });
    }, []);

    const addVariantToCart = (variantId, quantity) => {
        setIsCartOpen(true)

        const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
        const checkoutId = checkout.id

        return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            setCheckout(res);
        });
    }

    const updateQuantityInCart = (lineItemId, quantity) => {
        const checkoutId = checkout.id
        const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]

        return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
            setCheckout(res);
        });
    }

    const removeLineItemInCart = (lineItemId) => {
        const checkoutId = checkout.id

        return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
            setCheckout(res);
        });
    }

    const handleCartClose = () => {
        setIsCartOpen(false);
    }


    return (
        // ,backgroundImage: 'url(./assets/sign_bg.png)',backgroundSize:'contain'
        <div style={{ textAlign: 'center', height: '100vh', margin: 'auto', backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ padding: 20, width: '100%' }}>
                <div style={{ paddingTop: 10 }}>
                    <img src="./assets/checkoutlogo.png" alt="seat_logo" onClick={() => { history.push('/') }} />
                </div>
                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x', marginTop: '2%' }}>
                    <div style={{ width: '100%', color: '#1d2225' }}></div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', marginBottom: 20 }}>
                    <Button variant="contained" style={{ border: '1px solid #fff', backgroundColor: '#1d2225', color: '#fff', margin: 3, fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                        1
                    </Button>
                    <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, alignSelf: 'center', marginLeft: 15, color: '#fff' }}>seat o1 vip</div>
                </div>
                <div style={{ width: '100%', paddingLeft: 57 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 7 }}>
                        <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: '#fff' }}>Price :</div>
                        <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: '#DCCA26' }}>$</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 7 }}>
                        <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: '#fff' }}>Ship:</div>
                        <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: '#DCCA26' }}>$</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 7 }}>
                        <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: '#fff' }}>Tip:</div>
                        <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: '#DCCA26' }}>$</div>
                    </div>
                </div>
                <div style={{ width: '100%', paddingLeft: 25 }}>
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            1
                        </Button>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            5
                        </Button>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            10
                        </Button>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            15
                        </Button>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            20
                        </Button>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            25
                        </Button>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            50
                        </Button>
                        <Button variant="contained" style={{ margin: 8, border: '1px solid #fff', backgroundColor: '#fff', color: '#000', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: 50, borderRadius: '50%' }}>
                            100
                        </Button>
                    </div>
                </div>
                <div style={{ paddingLeft: 25 }}>
                    <div variant="contained" style={{ margin: "17px 8px 91px", border: '1px solid #fff', backgroundColor: '#fff', color: '#000', padding: 1, height: "min-content", minWidth: 50, borderRadius: 116 }}>
                        <div style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: '#444', padding: '4px 0' }}>Total : 000 $</div>
                        <div style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: '#ff0000', padding: '4px 0' }}>Press here to payment</div>
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Button variant="contained" style={{ backgroundColor: '#1d2225', border: '1px solid #fff', borderRadius: 70, fontFamily: 'Roboto', fontWeight: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 23, color: '#fff', margin: 3, width: '45%', height: 40, marginTop: 22 }} onClick={() => { history.push('/products') }}>
                        Back
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: '#1d2225', border: '1px solid #fff', borderRadius: 70, fontFamily: 'Roboto', fontWeight: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 23, color: '#fff', margin: 3, width: '45%', height: 40, marginTop: 22 }} onClick={() => { history.push('/payment') }}>
                        Payment
                    </Button>
                </div>
            </div>
            {/* <div style={{ width: '27px', backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div> */}
        </div>
    );
}

export default App;
