import React, {  useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Client from 'shopify-buy';
import '../shared/app.css';
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

    return (
        // ,backgroundImage: 'url(./assets/sign_bg.png)',backgroundSize:'contain'
        <div style={{ textAlign: 'center', height: '100vh', margin: 'auto', backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ padding: 20, width: '100%' }}>
                <div style={{ paddingTop: 10 }}>
                    <img src="./assets/paymentlogo.png" alt="seat_logo" onClick={() => { history.push('/') }} />
                </div>
                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x', marginTop: '2%' }}>
                    <div style={{ width: '100%', color: '#1d2225' }}>asdfasdfasdf</div>
                </div>
                <div style={{ width: '100%', marginBottom: 30 }}>
                    <Button variant="contained" style={{ margin: '8px 0', border: '1px solid #fff', backgroundColor: '#fff', color: '#444', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 40, minWidth: '100%', borderRadius: 71 }} onClick={() => { history.push('/products') }}>
                        C r e d i t
                    </Button>
                    <Button variant="contained" style={{ margin: '8px 0', border: '1px solid #fff', backgroundColor: '#fff', color: '#444', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 40, minWidth: '100%', borderRadius: 71 }} onClick={() => { history.push('/products') }}>
                        External terminal
                    </Button>
                    <Button variant="contained" style={{ margin: '8px 0', border: '1px solid #fff', backgroundColor: '#fff', color: '#444', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 40, minWidth: '100%', borderRadius: 71 }} onClick={() => { history.push('/products') }}>
                        C a s h
                    </Button>
                </div>

                <div style={{ width: '100%' }}>
                    <Button variant="contained" style={{ margin: '8px 0', border: '1px solid #fff', backgroundColor: '#1d2225', color: '#fff', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 40, minWidth: '100%', borderRadius: 71 }} onClick={() => { history.push('/products') }}>
                        Check
                    </Button>
                    <Button variant="contained" style={{ margin: '8px 0', border: '1px solid #fff', backgroundColor: '#1d2225', color: '#fff', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 40, minWidth: '100%', borderRadius: 71 }} onClick={() => { history.push('/products') }}>
                        M e n u
                    </Button>
                    <Button variant="contained" style={{ margin: '8px 0', border: '1px solid #fff', backgroundColor: '#1d2225', color: '#fff', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 40, minWidth: '100%', borderRadius: 71 }} onClick={() => { history.push('/products') }}>
                        S e a t
                    </Button>
                </div>
            </div>
            {/* <div style={{ width: '27px', backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div> */}
        </div>
    );
}

export default App;
