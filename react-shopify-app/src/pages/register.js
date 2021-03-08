import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Client from 'shopify-buy';
import '../shared/app.css';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {ChangeLicense} from '../reducers/action';
import {language} from '../language';
import FixedTextField from '../components/FixedTextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import '../config/global.js';

const CssTextField = withStyles({
    root: {
        '& label': {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '150%',
            alignItems: 'center',
            textAlign: 'center',

            color: ' rgba(239,228,176,1)',
            transform: 'translate(22px, 16px) scale(1)'
        },

        '& label.Mui-focused': {
            color: ' rgba(239,228,176,1)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1px solid rgba(255,255,255,1)',
                borderRadius: '19px'
            },
            '&:hover fieldset': {
                borderColor: ' rgba(247, 160, 165,1)',
            },
            '&.Mui-focused fieldset': {
                borderColor: ' rgba(247, 160, 165,1)',
            },
        },
        '& input':{
            color: '#fff'
        }
    },
})(FixedTextField);

const top4Plan = [
    { title: 'Lite $14.99', price: 14.99 },
    { title: 'Standard $44.99', price: 44.99 },
    { title: 'Premium $99.99', price: 99.99 },
    { title: 'Unlimit ＄299.99', price: 299.99 }
]

// const client = Client.buildClient({
//   storefrontAccessToken: Config.storefrontAccessToken,
//   domain: Config.domain
// });

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    formControl: {
        //   margin: theme.spacing(1),
            minWidth: '100%',
            justifyContent:'center',
            backgroundColor:'#1d2225',
            borderRadius:17,
            border:'1px solid #fff'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
    },
}));
function App(props) {
    console.log("aaaaaaaaaa-",window);
    console.log("aaaaaaaaaa-",window.location.ancestorOrigins[0]);
    var domain = window.location.ancestorOrigins[0];
    var apikey = window.storefrontAccessToken;
    if(window.location.ancestorOrigins.length==0)
    {
        domain = "https://your-domain.myshopify.com";
        apikey = "442393f9c888d0530b68bdae37f9b13b";
    }
    const [popu1, setPopu1] = useState([]);
    const [popu2, setPopu2] = useState([]);
    // const [shopifyDomain, setShopifyDomain] = useState("mymymy1234.myshopify.com");
    // const [shopifyApiKey, setShopifyApiKey] = useState("442393f9c888d0530b68bdae37f9b13b");
    const [shopifyDomain, setShopifyDomain] = useState(domain.split('//')[1]);
    // const [shopifyApiKey, setShopifyApiKey] = useState(apikey);
    const [posAppPlan, setPosAppPlan] = useState("");
    const [paymentCardnum, setPaymentCardnum] = useState("2343-2342-2342-3453");

    let history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleChangeShopifyDomain = (prop) => (event) => {
        setShopifyDomain(event.target.value);
    };
    // const handleChangeShopifyApiKey = (prop) => (event) => {
    //     setShopifyApiKey(event.target.value);
    // };
    const handleChangePosAppPlan = (prop) => (event, newValue) => {
        setPosAppPlan(newValue);
    };

    const handleChangePaymentCardnum = (prop) => (event) => {
        setPaymentCardnum(event.target.value);
    };
    var lang_index = props.lang_index;
    //lang_index = 1;
    const handle_login = () => {
        var price = 0;
        if(posAppPlan != null)
            price = posAppPlan.price;
        {
            fetch(global.api_domain+"/api/posApp/findAccessToken", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                ShopifyDomain: shopifyDomain,
                PosAppPlan: price,
            })
            })
            .then(response => response.json())
            .then(response => {
                console.log("-----",response);
                if(response.license_key === "no license" || response.license_key === undefined)
                {
                    alert("You must agree to a plan in one of the four categories.");
                }
                else
                {
                    if(response.active === "PENDING")
                    {
                        //redirection
                        console.log("=====",response.confirmationUrl);
                        setPosAppPlan("");
                        window.top.close();
                        window.open(response.confirmationUrl);
                        //window.location.href = response.confirmationUrl;
                    }
                    else
                    {
                        global.domain = response.shopifyDomain;
                        global.storefrontAccessToken = response.shopifyApiKey;
                        global.price_list = response.PosAppPlan;
                        // global.price_list = 'unlimit';
                        props.ChangeLicense(response.license_key);
                        fetch(global.api_domain+"/api/settings/init", {
                            "method": "POST",
                            "headers": {
                                "content-type": "application/json",
                                "accept": "application/json"
                            },
                            "body": JSON.stringify({
                                language:props.lang_index,
                                value:"customers",
                                license_key: response.license_key
                            })
                            })
                            //.then(response => response.json())
                            .then(response => {
                                history.push("/seat");
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    useEffect(() => {
        handleToggle();
        setShopifyDomain(global.domain);
        //handle_login();
        setTimeout(function () {
            //handle_login();
        }, 1500);
    }, []);

    return (
        <div style={{ textAlign: 'center', height: '100vh', margin: 'auto', backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{width:'100%',height:'100%'}}>
                <div style={{ textAlign: 'center', width: '100%', height: '70px', margin: 'auto', backgroundColor: 'rgb(94 93 93)', color:'#FFF', justifyContent: 'space-between',
                    display: 'flex',marginTop:'30px'}}>

                    <div style={{width:'100%',backgroundColor:'rgb(94 93 93)', color:'#FFF',overflow:'auto', fontSize:'50px'}}>
                    {language[props.lang_index].login_title}
                    </div>
                </div>
                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap',width: '100%', height: 'calc(100% - 230px)'}}>
                    <Grid item xs={12} sm={5} style={{overflow: 'auto', padding: 15, display: 'flex', flexWrap: 'wrap',
                        justifyContent: 'space-around', paddingTop:'10px',width:'50%',borderRadius:'15px' , border: '1px solid #FFFFFF',margin:10}}>
                        <CssTextField
                            label={language[props.lang_index].login_domain}
                            variant="outlined"
                            id="custom-css-outlined-input"
                            value={shopifyDomain}
                            onChange={handleChangeShopifyDomain()}
                            style={{ width: '100%',marginTop:50}}
                        />

                        {/* <CssTextField
                            label={language[props.lang_index].login_key}
                            variant="outlined"
                            id="custom-css-outlined-input"
                            value={shopifyApiKey}
                            onChange={handleChangeShopifyApiKey()}
                            style={{ width: '100%' }}
                        /> */}
                        <Autocomplete
                            id="combo-box-demo"
                            options={top4Plan}
                            getOptionLabel={(option) => option.title}
                            value={posAppPlan}
                            onChange={handleChangePosAppPlan()}
                            style={{ width: '100%' }}
                            renderInput={(params) => <CssTextField {...params} label={language[props.lang_index].login_plan} variant="outlined" style={{}} />}
                        />
                        <CssTextField
                            label={language[props.lang_index].login_card}
                            variant="outlined"
                            id="custom-css-outlined-input"
                            value={paymentCardnum}
                            onChange={handleChangePaymentCardnum()}
                            style={{ width: '100%', display:'none' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{alignSelf:'center'}}>
                        <div style={{color:'#fff',fontSize:'22px',padding:'10px',overflow:'auto'}}>{language[props.lang_index].login_content1}<br></br>
                        {language[props.lang_index].login_content2}</div>
                    </Grid>
                </Grid>
                {/* <div style={{display:'flex',flexWrap:'wrap',width: '100%', height: 'calc(100% - 230px)'}}>
                    <div style={{  overflow: 'auto', padding: 15, display: 'flex', flexWrap: 'wrap',
                        justifyContent: 'space-around', paddingTop:'10px',width:'50%',borderRadius:'15px' , border: '1px solid #FFFFFF',margin:10}}>
                    </div>
                </div> */}
                <div style={{ cursor:'pointer', backgroundColor:'#5c69c4', height:'40px',width: '95%', display: 'flex', display:'inline-flex', flexWrap: 'wrap', marginTop:'20px',justifyContent: 'space-around',left:'auto',color:'#fff',fontFamily:'Rotobo',fontSize:17 }} onClick={{}}
                onClick={handle_login}
                >
                <div style={{height:'100%',width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div>{language[props.lang_index].login_button}</div>
                </div>
                </div>
            </div>
            </div>
    );
}

function mapStateToProps(state) {
    return {
        lang_index: state.authen,
        license_key: state.license_key
    };
}
const mapDispatchToProps = {
    ChangeLicense
};
export default connect(mapStateToProps,mapDispatchToProps)(App);