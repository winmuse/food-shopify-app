import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Client from 'shopify-buy';
import '../shared/app.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import {language} from '../language';
import '../config/global.js';
// const client = Client.buildClient({
//   storefrontAccessToken: global.storefrontAccessToken,
//   domain: global.domain
// });
var client;

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function App(props) {
    const [popu1, setPopu1] = useState([]);
    const [popu2, setPopu2] = useState([]);
    let history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    var lang_index = props.lang_index;
    //lang_index = 1;
    const init = () => {
        var arr1 = [];
        var arr2 = [];
        client.product.fetchAll().then((res) => {
            res.map((val, index) => {
                if (index >= 0 && index <= 3)
                    arr1.push(val);
                if (index >= 4 && index <= 6)
                    arr2.push(val);
            })
            setPopu1(arr1);
            setPopu2(arr2);
            handleClose();
        });
    }
    useEffect(() => {
        client = Client.buildClient({
            storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
            domain: global.domain
          });
        handleToggle();
        setTimeout(function () {
            init();
        }, 1500);
    }, []);

    return (
        <div style={{ textAlign: 'center', width: '100%', height: '100%', margin: 'auto', backgroundColor: '#1d2225', justifyContent: 'space-between', display: 'flex' }}>
            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <div style={{ width: '100%', padding: '30px 25px' }}>
                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}>
                    <img src="./assets/newmenulogo.png" alt="newmenulogo" style={{ marginBottom: 20 }} alt="alt" />
                </div>
                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x' }}>
                    <div style={{ width: '100%', color: '#1d2225' }}>asdfasdfasdf</div>
                </div>
                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        popu1.map((val, index) => (
                            <div style={{ width: 100, height: 100, textAlign: 'center', margin: '2%', marginBottom: 30 }}>
                                <img src={val.images[0].src} style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="alt"></img>
                                <h5 className="Product__title">{val.title}</h5>
                            </div>
                        ))
                    }
                </div>

                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x', marginTop: '2%' }}>
                    <div style={{ width: '100%', color: '#1d2225' }}>asdfasdfasdf</div>
                </div>

                <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        popu2.map((val, index) => (
                            <div style={{ width: 80, height: 80, textAlign: 'center', margin: '2%', marginBottom: 35 }}>
                                <img src={val.images[0].src} style={{ width: '100%', borderRadius: '50%', height: '100%' }} alt="alt"></img>
                                <div style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.4rem', opacity: '0.7', color: '#fff', fontFamily: 'Roboto' }}>{val.title}</div>
                            </div>
                        ))
                    }
                </div>
                <Button variant="contained" style={{ backgroundColor: '#1d2225', border: '1px solid #fff', borderRadius: 70, fontFamily: 'Roboto', fontWeight: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 23, color: '#fff', margin: 3, width: '100%', height: 40, marginTop: 22 }} onClick={() => { history.push('/products') }}>
                    {language[lang_index].advert_next_button}
                </Button>
            </div>
            <div style={{ width: '27px', backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        lang_index: state.authen
    };
}
export default connect(mapStateToProps)(App);