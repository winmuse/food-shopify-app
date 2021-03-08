import React, { useEffect } from 'react';
import Product from './Product';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Client from 'shopify-buy';
import { connect } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//import firebaseAction from '../firebaseAction';
import HorizontalScroll from 'react-scroll-horizontal';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import StickyBox from "react-sticky-box";
import {language} from '../language';
// qr code start
import PartStylesViewer from '../qrcode';
import {genQRInfo} from "../qrcode/actions";
import { handleUpload, handleInputUrl } from "../qrcode/utils/gaHelper";
// qr code end
import '../config/global.js';
// const client = Client.buildClient({
//   storefrontAccessToken: global.storefrontAccessToken,
//   domain: global.domain
// });
var client;
var flag="display";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

  show: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderRadius: '19px',
      border: '1px solid #fff',
      backgroundColor:'#1d2225',
      color:'#fff',
      boxShadow: 'none',
      height: '40px',
      // display:'initial'
  },
  hid: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '19px',
    border: '1px solid #fff',
    backgroundColor:'#1d2225',
    color:'#fff',
    boxShadow: 'none',
    height: '40px',
    display:'none'
  },
  show_customer:{
    display:''
  },
  hide_customer:{
    display:'none'
  },
  input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      color:'#fff',
      fontSize:15
  },
  iconButton: {
      padding: 10,
      color:'#fff',
  },
  divider: {
      height: 28,
      margin: 4,
  },
  formControl: {
  //   margin: theme.spacing(1),
    minWidth: 120,
    justifyContent:'center'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));
const useStylesPassword = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
    // border:'1px solid #fff'
  },
}));
function Products(props,{dispatch}) {
  var lang_index = props.lang_index;
  //lang_index = 1;
  const history = useHistory();
  const classes = useStyles();
  const classesSet = useStylesPassword();
  const [open, setOpen] = React.useState(false);
  const [seatchflag,setSearchflag]=React.useState(false);
  const [productsc, setProductsC] = React.useState([]);
  let col=props.collections;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [statecheck, setStateCheck] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  //const [showSetting, setShowSetting] = React.useState(true);

  const handleChangePassword = (prop) => (event) => {
    setValueUsers({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };
  const handleChangeCheckPassword = (prop) => (event) => {
    setValueUsersCheck({ ...valuesCheck, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValueUsers({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setValueUsersCheck({ ...valuesCheck, password: '' });
    setValueUser(settingArray[0].value);
    setValueUsers({ ...values, password: settingArray[0].password });
  };
  const toggleDrawerPass = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setStateCheck({ ...statecheck, [anchor]: open });
    valuesCheck.password = '';
  };
  const [values, setValueUsers] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });
  const [valuesCheck, setValueUsersCheck] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });
  const list = (anchor) => (
    <div className={classes.root} style={{display: 'flex',flexDirection:'column',backgroundColor:'rgb(14, 17, 18)',height:'100%',justifyContent:'space-between'}}
      //onClick={toggleDrawer(anchor, false)}
      //onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{display: 'flex',flexDirection:'column'}}>
      <FormControl className={clsx(classesSet.margin)} variant="outlined">
        <FormLabel component="legend" style={{fontFamily:'monospace', fontSize:'20px',margin:'30px 30px',color:'#fff',borderBottom:'1px solid #fff'}}>設定</FormLabel>
        <RadioGroup style={{fontFamily:'monospace', fontSize:'20px',margin:'0 30px'}} aria-label="gender" name="gender1" value={value_user} onChange={handleChange}>
          <FormControlLabel style={{fontFamily:'monospace', fontSize:'20px'}} value="customers" control={<Radio />} label="顧客" />
          <FormControlLabel style={{fontFamily:'monospace', fontSize:'20px'}} value="kitchen" control={<Radio />} label="厨房" />
          <FormControlLabel style={{fontFamily:'monospace', fontSize:'20px'}} value="clerk" control={<Radio />} label="店員" />
        </RadioGroup>
      </FormControl>
      <FormControl className={clsx(classesSet.margin, classesSet.textField)} style={{margin:'30px'}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" style={{fontSize:'18px',color:'#fff'}}>パスワードの変更</InputLabel>
          <OutlinedInput
            style={{color:'#fff'}}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChangePassword('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{color:'#fff'}}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
      </FormControl>
      <Button type="submit" variant="outlined" color="primary" className={classesSet.button} style={{fontSize:'20px',margin:'0 30px',color:'#fff',borderColor:'#fff',backgroundColor:'#5c69c4'}} onClick={()=>{handleSetting(anchor)}}>
      設定
      </Button>
      </div>
    </div>
  );

  const checklist = (anchor) => (
    <div className={classes.root} style={{display: 'flex',flexDirection:'column',backgroundColor:'rgb(14, 17, 18)',height:'100%',justifyContent:'space-between'}}
      //onClick={toggleDrawer(anchor, false)}
      //onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{display: 'flex',flexDirection:'column'}}>
      <FormControl className={clsx(classesSet.margin)} variant="outlined">
        <FormLabel component="legend" style={{fontFamily:'monospace', fontSize:'20px',margin:'30px 30px',color:'#fff',borderBottom:'1px solid #fff'}}>設定</FormLabel>
      </FormControl>
        <FormLabel component="legend" style={{fontFamily:'monospace', fontSize:'15px',margin:'30px 30px',color:'#fff'}}>パスワードを入力してください。</FormLabel>

      <FormControl className={clsx(classesSet.margin, classesSet.textField)} style={{margin:'30px'}} variant="outlined">
        <InputLabel htmlFor="setpassword" style={{fontSize:'20px',color:'#fff'}}>パスワード</InputLabel>
          <OutlinedInput
            style={{color:'#fff'}}
            id="setpassword"
            autoFocus={true}
            type={valuesCheck.showPassword ? 'text' : 'password'}
            value={valuesCheck.password}
            onChange={handleChangeCheckPassword('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{color:'#fff'}}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
      </FormControl>
      <Button type="submit" variant="outlined" color="primary" className={classesSet.button} style={{fontSize:'20px',margin:'0 30px',color:'#fff',borderColor:'#fff',backgroundColor:'#5c69c4'}} onClick={()=>{handleSettingCheck(anchor)}}>
      確認
      </Button>
      </div>
    </div>
  );

  const [value_user, setValueUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [settingArray, SetSettingArray] = React.useState(Array);
  const [language_i,setLanguage_I] = React.useState(0);

  const handleChange = (event) => {
    setValueUser(event.target.value);
  };
  const handleSetting = (anchor) => {
    //firebaseAction.updateSettingValue(settingArray[0].key, value_user);
    //firebaseAction.updateSettingPassword(settingArray[0].key, password);
    fetch(global.api_domain+"/api/settings/update", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        value:value_user,
        password:password,
        id: settingArray[0].key
      })
    })
    //.then(response => response.json())
    .then(response => {

    })
    .catch(err => {
        console.log(err);
    });

    if(value_user === "kitchen")
    {
      history.push(({
        pathname: '/checkout_confirm',
        state: { fire_seatnum:props.fire_seatnum,fire_seatkey:props.fire_seatkey,fire_seatordernum:props.fire_seatordernum, fire_checkoutId:props.fire_checkoutId, isCartOpen: false}}))
    }
    else if(value_user === "clerk")
      history.push('/seat')
    setState({ ...state, [anchor]: open });
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleSettingCheck = (anchor) => {
    if(valuesCheck.password === settingArray[0].password)
    {
      setState({ ...state, [anchor]: true });
      setStateCheck({ ...statecheck, [anchor]: false });
    }
  }
  const init_settings=()=>{
    let value = "";
    fetch(global.api_domain+"/api/settings/findAll", {
      "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
          license_key:props.license_key
        })
      })
      .then(response => response.json())
      .then(response => {
        let setting = [];
        for(var i=0; i<response.length; i++)
        {
          setting.push({key:response[i].id, value:response[i].value, password:response[i].password,language:response[i].language});
        }
        if(setting.length === 0)
        {
          fetch(global.api_domain+"/api/settings/create", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
              license_key:props.license_key,
              value: "customers",
              password: "",
              img: "",
              language: "0"
            })
          })
          .then(response => response.json())
          .then(response => {
          })
          .catch(err => {
              console.log(err);
          });
          setValueUser("customers");
          setPassword("");
          value = "customers";
        }
        else
        {
          setValueUser(setting[0].value);
          setPassword(setting[0].password);
          setLanguage_I(setting[0].language);
          value = setting[0].value;
        }
        SetSettingArray(setting);
        setValueUsers({ ...values, password: setting[0].password });
        setValueUsersCheck({ ...valuesCheck, password: '' });
      })
      .catch(err => {
          console.log(err);
      });

      client.product.fetchQuery({productsFirst: 100}).then((res) => {
        let prod = res.map((product) => {
          return (
            <Product
              addVariantToCart={props.addVariantToCart}
              client={props.client}
              key={product.id.toString()}
              settingValue={value}
              product={product}
              mouseDown={props.mouseDown}
              mouseUp={props.mouseUp}
            />
          );
        });
        setProductsC(prod);
      });
  }
  useEffect(() => {
    client = Client.buildClient({
      storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
      domain: global.domain
    });
    handleToggle();
    if(props.license_key === 0 || props.license_key === null || props.license_key === undefined)
    {
      history.push("/");
    }

    setTimeout(function () {
      handleClose();
    }, 1500);
    init_settings(props);
    // handleInputUrl();
    //genQRInfo(props.qrurl);
  }, []);

  const productOfCollection = (id) => {
    if((global.price_list==='unlimit'))
    {
      client.collection.fetchWithProducts(id, {productsFirst: 100}).then((res) => {
        let prod = res.products.map((product) => {
          return (
            <Product
              addVariantToCart={props.addVariantToCart}
              client={props.client}
              key={product.id.toString()}
              settingValue={value_user}
              product={product}
              mouseDown={props.mouseDown}
              mouseUp={props.mouseUp}
            />
          );
        });
        setProductsC(prod);
      });
    }
    else
    {
      alert(language[language_i].seat_price_alert);
    }
  };

  let collection = props.collections.map((collection,index) => {
    return(
        <div className="collection" onClick={()=>{productOfCollection(collection.id)}} key={collection.id}>
          {/* <img src={collection.image.src} alt="alt" style={{ borderRadius: '50%', cursor: 'pointer', height: '8vh',width:'8vh',marginRight:'2vh' }}/> */}
          <div key={index+2}>
            <h5 style={{userSelect:'none',color:'#fff', fontSize:'20px',margin:2,textAlign:'left'}} key={index+3}>{collection.title}</h5>
            {/* <h5 style={{userSelect:'none',color:'#303030', fontSize:'18px', margin:2}} key={index+4}>{collection.description}</h5> */}
          </div>
        </div>
        // <div style={{width:500,height:'100%',backgroundColor:'#ff0000',marginRight:20}}></div>
    );
  });

  return (

    <div style={{ textAlign: 'center', width: '100%', height: '100vh', margin: 'auto', backgroundColor: '#1d2225', justifyContent: 'space-between', display: 'flex' }}>
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, false)} id="btn_drawer" style={{ display: 'none' }}>{anchor}</Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawerPass(anchor, true)} id="btn_drawer_pass" style={{ display: 'none' }}>{anchor}</Button>
            <Drawer anchor={anchor} open={statecheck[anchor]} onClose={toggleDrawerPass(anchor, false)}>
              {checklist(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ width: '100%', height: '100vh'}}>

        <div style={{ textAlign: 'center', width: '100%', height: '70px', margin: 'auto', backgroundColor: 'rgb(94 93 93)', color:'#FFF', justifyContent: 'space-between', 
          display: 'flex',marginTop:'30px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <SettingsIcon style={{cursor:'pointer',fontSize:'30px'}} onClick={()=>{document.getElementById('btn_drawer_pass').click()}} />
          </div>
          <div style={{width:'100%',backgroundColor:'rgb(94 93 93)', color:'#FFF',overflow:'auto', paddingLeft:'10px', paddingTop:'5px',display:'-webkit-inline-box',flexWrap: 'nowrap'  }}>
            {/* <HorizontalScroll> */}
              {collection}
            {/* </HorizontalScroll> */}
          </div>

          <div style={{ width: '80px'}}>
            {/* <img src="./assets/qr_img.png" alt="qr" style={{ width: '70px',height:'100%'}} /> */}
            <PartStylesViewer/>
          </div>

        </div>

        <div style={{ cursor: 'pointer', width: '100%', height:'10px', textAlign: 'center', backgroundImage: 'url(/assets/point.png)',
        backgroundRepeat: 'repeat-x' }}>
          <div style={{ width: '100%', height:'100%', color: '#1d2225' }}>hello</div>
        </div>


        <div id='proDiv' style={{ width: '100%', height: 'calc(100% - 190px)', overflow: 'auto', paddingRight: 15, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-around'}}>
          {productsc}
        </div>


        <div style={{ cursor: 'pointer', width: '100%', height:'10px', textAlign: 'center', backgroundImage: 'url(/assets/point.png)',
        backgroundRepeat: 'repeat-x' }}>
          <div style={{ width: '100%', height:'100%', color: '#1d2225' }}>hello</div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' , height:'65px', paddingTop:'10px'}}>
        <div className={value_user!=='customers' ? classes.show_customer : classes.hide_customer} >
              {/* {if(value === "kitchen" || value === "clerk")} */}
              <img src="/assets/seat.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                if(value_user==="clerk")
                {
                  history.push(({
                    pathname: '/seat'
                    //state: { fire_seatnum:props.fire_seatnum,fire_seatkey:props.fire_seatkey,fire_seatordernum:props.fire_seatordernum, fire_checkoutId:props.fire_checkoutId, isCartOpen: false}
                  }))
                }}}
              />
            </div>
            <div style={{width:'70px',borderBottom:'groove', marginBottom:'10px',backgroundColor:'#434343',borderRadius:'5px',marginLeft:'25px'}}>
              <div style={{width:'45px', height:'45px',margin:'auto'}}>
                <img src="/assets/menu.png" alt="alt" style={{cursor:'pointer', width:'100%', height:'100%'}}/>
              </div>
            </div>
            {/* <div style={{value !== 'customers' ? '':'none'}}> */}
            <div className={value_user!=='customers' ? classes.show_customer : classes.hide_customer} style={{marginRight:'10px'}}>
              {/* {if(value === "kitchen" || value === "clerk")} */}
              <img src="/assets/kitchen.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                history.push(({
                  pathname: '/checkout_confirm',
                  state: { fire_seatnum:props.fire_seatnum,fire_seatkey:props.fire_seatkey,fire_seatordernum:props.fire_seatordernum, fire_checkoutId:props.fire_checkoutId, isCartOpen: false}
                }))
              }} />
            </div>
            <div>
              <img src="/assets/printer.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={() => props.addVariantToCart(0,0,flag)}/>
            </div>
            {/* <div style={{width:'50%',height:'350%',backgroundColor:'#ff0000'}}>
            <PartStylesViewer/>
            </div> */}
        </div>
      </div>
      {/* <div style={{ width: '27px', backgroundImage: 'url(/assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div> */}
    </div>
  );
  // }
}
function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    qrurl:state.qrurl,
    license_key: state.license,
  };
}
export default connect(mapStateToProps)(Products);
