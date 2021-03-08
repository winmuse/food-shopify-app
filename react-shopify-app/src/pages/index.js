import React, { useState, useEffect } from 'react';
import Blink from 'react-blink-text';
import {useHistory} from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import {ChangeAuthen} from '../reducers/action';
import {ChangeLicense} from '../reducers/action';
import {language} from '../language';
import firebaseAction from '../firebaseAction';
import {genQRInfo} from "../qrcode/actions";
import FixedTextField from '../components/FixedTextField';
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

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: 100,
      justifyContent:'center',
      backgroundColor:'#1d2225',
      paddingTop:'10px'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function App(props){
    let history = useHistory();
    let setting = [];
    useEffect(() => {
    })
    var domain = window.location.ancestorOrigins[0];

    if(window.location.ancestorOrigins.length==0)
    {
        domain = "https://your-domain.myshopify.com";
    }
    const [shopifyDomain, setShopifyDomain] = useState(domain.split('//')[1]);

    const classes = useStyles();
    const [language_i,setLanguage_I] = React.useState(0);
    const [settingKey,setSettingKey] = React.useState(0);
    const handleChange = (event) => {
        var lang_index = event.target.value-10;
        props.ChangeAuthen(lang_index);
        setLanguage_I(lang_index);
        //firebaseAction.updateSettingLanguage(setting[0].key,lang_index);
    };
    const handleChangeShopifyDomain = (prop) => (event) => {
        setShopifyDomain(event.target.value);
    };
    function advert() {
        console.log("aaaaa",shopifyDomain);
        handle_login();
        //history.push("/register");
    }

    const handle_login = () => {
        {
            fetch(global.api_domain+"/api/posApp/findAccessToken", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                ShopifyDomain: shopifyDomain,
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
                        global.domain = shopifyDomain;
                        history.push("/register");
                    }
                    else
                        alert(language[language_i].index_domain_alert);
                }
                else
                {
                    if(response.active != "ACTIVE")
                    {
                        //redirection
                        history.push("/register");
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
                                language:language_i,
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

    return(
        <div style={{height:'100vh',margin:'auto', backgroundColor:'#1d2225', justifyContent:'space-between', display:'flex'}}>

            <div style={{width:'27px', backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat:'repeat-y'}}></div>

            <div style={{cursor:'pointer', width:'100%', textAlign:'center'}}>

                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',marginLeft:'10px',marginRight:'10px'}}>
                    <img src="./assets/logo.png" alt="alt"></img>
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language_i+10}
                            onChange={handleChange}
                            style={{color:'#FFFFFF'}}
                        >
                        <MenuItem value={10}>Japanese</MenuItem>
                        <MenuItem value={11}>English</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div style={{width:'100%',height:'30vh'}} align="center">
                    <div style={{width:'30vh',height:'100%'}}>
                        <img src="./assets/food_1.png" style={{width:'100%',height:'100%',marginTop:'40px'}} alt="alt"></img>
                    </div>
                </div>
                <div style={{width:'100%'}} align="center">
                    <div style={{width:'33vh',height:'100%'}}>
                        <img src="./assets/mark.png" style={{width:'100%',height:'100%',marginTop:'20px'}} alt="alt"></img>
                    </div>
                </div>
                <div style={{width:'100%', marginTop:'20px'}} align="center"  onClick={advert}>
                    <Blink color='#FFFFFF' text={language[language_i].index_label} fontSize={20}>
                    {language[language_i].index_label}
                    </Blink>
                </div>
                
                <Grid item xs={12} sm={12} style={{align:'center', padding:'30px'}}>
                    <CssTextField
                        label={language[language_i].login_domain}
                        variant="outlined"
                        id="custom-css-outlined-input"
                        value={shopifyDomain}
                        onChange={handleChangeShopifyDomain()}
                        style={{ width: '100%',marginTop:50}}
                    />
                </Grid>
                
            </div>
            <div style={{width:'27px', backgroundImage: 'url(./assets/logo_ban.png)',backgroundRepeat:'repeat-y'}}></div>

        </div>
    );
}


function mapStateToProps(state) {
    return {
        lanuage: state.authen,
        license_key: state.license_key
    };
}
const mapDispatchToProps = {
    ChangeAuthen,
    genQRInfo,
    ChangeLicense
};
export default connect(mapStateToProps,mapDispatchToProps)(App);