import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Client from 'shopify-buy';
import '../shared/app.css';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//import firebaseAction from '../firebaseAction';
import { connect } from 'react-redux';
import {language} from '../language';
import SettingsIcon from '@material-ui/icons/Settings';
import LineItem from '../components/LineItemSeat';

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
  formControl: {
  //   margin: theme.spacing(1),
    minWidth: 120,
    justifyContent:'center'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  empty:{
    display:'flex',justifyContent:'center',alignItems:'center'
  },
  show_customer:{
    display:''
  },
  hide_customer:{
    display:'none'
  },
  show:{
    display:'initial'
  },
  hidd:{
    display:'none'
  }
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
  },
}));

function App(props) {
  const classes = useStyles();
  const classesSet = useStylesPassword();
  const [open, setOpen] = React.useState(false);
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
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };
  const handleChangeCheckPassword = (prop) => (event) => {
    setValuesCheck({ ...valuesCheck, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setValuesCheck({ ...valuesCheck, password: '' });
    setValue(settingArray[0].value);
    setValues({ ...values, password: settingArray[0].password });
  };
  const toggleDrawerPass = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setStateCheck({ ...statecheck, [anchor]: open });
    valuesCheck.password = '';
  };
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });
  const [valuesCheck, setValuesCheck] = React.useState({
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
        <RadioGroup style={{fontFamily:'monospace', fontSize:'20px',margin:'0 30px'}} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
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
        <InputLabel htmlFor="outlined-adornment-password" style={{fontSize:'20px',color:'#fff'}}>パスワード</InputLabel>
          <OutlinedInput
            style={{color:'#fff'}}
            id="outlined-adornment-password"
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
      {/* {language[language_i].setting_button} */}
      確認
      </Button>
      </div>
    </div>
  );

  const [value, setValue] = React.useState('customers');
  const [password, setPassword] = React.useState('');

  const [settingArray, SetSettingArray] = React.useState(Array);

  const handleSetting = (anchor) => {
    // firebaseAction.updateSettingValue(settingArray[0].key, value);
    // firebaseAction.updateSettingPassword(settingArray[0].key, password);
    fetch(global.api_domain+"/api/settings/update", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        value:value,
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

    if(value === "customers"){
      history.push(({
        pathname: `/products/${props.location.state.fire_seatkey}`,
        state: { seatNum:props.location.state.fire_seatnum,seatKey:props.location.state.fire_seatkey,seatOrdernum:props.location.state.fire_seatordernum, checkoutId:props.location.state.fire_checkoutId, isCartOpen: false}}))
    }
    else if(value === "clerk")
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
  const history = useHistory();
  const [currentcheckout, setCurrentCheckout] = useState([]);
  const [line_items, setLine_items] = useState([]);
  const [seat_title, setSeat_title] = useState([]);
  const [checkoutid, setCheckoutID] = useState(false);
  const [seatnum,setSeatnum]=useState([]);
  const [seatflag,setSeatflag]=useState(true);
  const [language_i,setLanguage_I] = React.useState(0);
//  var currentcheckoutid = "";

  const init = () => {
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
          setValue("customers");
          setLanguage_I("0");
          setPassword("");
        }
        else
        {
          setValue(setting[0].value);
          setPassword(setting[0].password);
          setLanguage_I(setting[0].language);
        }
        SetSettingArray(setting);
        setValues({ ...values, password: setting[0].password });
      })
      .catch(err => {
          console.log(err);
      });
    handleClose();
  }
  const init_data = () => {
    handleToggle();
    setTimeout(function () {
      init();
    }, 1500)

  fetch(global.api_domain+"/api/seats/findAll", {
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
      let seats = [];
      for(var i=0; i<response.length; i++)
      {
        seats.push({key:response[i].id, seat:response[i].seat, text:response[i].text, email:response[i].email, checkoutId:response[i].checkoutId, flag:response[i].flag});
      }
      SetSeat(seatArray => seats);
      var lines=[];
      var titles=[];
      seats.map((seat,index)=>
      {
        var order_lines=[];
        var title="";
        client.checkout.fetch(seat.checkoutId).then((res) => {
          if(res.lineItems.length>0){
          }
          title=language[language_i].seat_name+(index+1)+" ("+res.createdAt.replace("T"," ").replace("Z","")+")";

          var line1=[];
          var line2=[];
          var line3=[];
          var line4=[];
          var line5=[];
          var line6=[];
          var line7=[];
          var line8=[];
          var line9=[];
          var line10=[];
          for(var subindex=0;subindex<res.lineItems.length;subindex++)
          {
            var map = {}

            for (var i=0; i < res.lineItems[subindex].customAttributes.length; i++){
                map[res.lineItems[subindex].customAttributes[i].key] = res.lineItems[subindex].customAttributes[i]
            }
            if(map["order"] == undefined)
              continue;
            if(map["order"].value.split("/").length !== 2)
              continue;
            if(parseInt(res.lineItems[subindex].quantity,10)<parseInt(map["order"].value.split("/")[1],10))
              continue;

            if(map["order"].value.includes("1/"))
            {
              line1.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={1}
                />
              );
            }
            else if(map["order"].value.includes("2/"))
            {
              line2.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={2}
                />
              );
            }
            else if(map["order"].value.includes("3/"))
            {
              line3.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={3}
                />
              );
            }
            else if(map["order"].value.includes("4/"))
            {
              line4.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={4}
                />
              );
            }
            else if(map["order"].value.includes("5/"))
            {
              line5.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={5}
                />
              );
            }
            else if(map["order"].value.includes("6/"))
            {
              line6.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={6}
                />
              );
            }
            else if(map["order"].value.includes("7/"))
            {
              line7.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={7}
                />
              );
            }
            else if(map["order"].value.includes("8/"))
            {
              line8.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={8}
                />
              );
            }
            else if(map["order"].value.includes("9/"))
            {
              line9.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={9}
                />
              );
            }
            else
            {
              line10.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={parseInt(res.lineItems[subindex].customAttributes[0].value.split("/")[1],10)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={10}
                />
              );
            }
          }
          if(line10.length>0)
            order_lines.push(line10);
          if(line9.length>0)
            order_lines.push(line9);
          if(line8.length>0)
            order_lines.push(line8);
          if(line7.length>0)
            order_lines.push(line7);
          if(line6.length>0)
            order_lines.push(line6);
          if(line5.length>0)
            order_lines.push(line5);
          if(line4.length>0)
            order_lines.push(line4);
          if(line3.length>0)
            order_lines.push(line3);
          if(line2.length>0)
            order_lines.push(line2);
          if(line1.length>0)
            order_lines.push(line1);

          if(order_lines.length>0){
            lines[index] = (order_lines);
            titles[index] = (title);
            setSeat_title(title);
            //lines.push(order_lines);
            //titles.push(title);
            setLine_items(lines);
            setSeatnum(titles);
          }
          else{
            //lines[index] = "";
          }
        })
        .catch((error)=>{
          // setLine_items('line');
        });
      })
      // setLine_items("");

       //if(lines.length>0)
       {
        setLine_items(lines);
        setSeatnum(titles);
         //setLine_items(lines);
      //   setSeatnum(titles);
       }
    });
  }
  const [seatArray, SetSeat] = useState(Array);
  function updateQuantityInCart(currentcheckoutid, lineItemId, updateCount) {

    const customAttributes = [{ key: 'order', value: updateCount+"" }];
    const lineItemsToUpdate = [{ id: lineItemId, customAttributes: customAttributes }]

      client.checkout.updateLineItems(currentcheckoutid, lineItemsToUpdate).then(res => {
        init_data();
        setTimeout(function () {
          init();
        }, 1500)
      });
  }
  useEffect(() => {
    client = Client.buildClient({
      storefrontAccessToken: global.storefrontAccessToken,//442393f9c888d0530b68bdae37f9b13b
      domain: global.domain
    });
    if(props.license_key === 0 || props.license_key === null || props.license_key === undefined)
      history.push("/register");
    init_data();
  }, []);

  const handleChange=(e)=>{
    setValue(e.target.value);
  }

  return (

    // <div style={{height:'100vh', overflow:'auto', width:'100vw',
    //   backgroundColor: '#1d2225', justifyContent: 'space-between', flexWrap:'wrap'}}>
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
      <div style={{ width: '100%', height: '100vh'}}>

        <div style={{ textAlign: 'center', width: '100%', height: '70px', margin: 'auto', backgroundColor: 'rgb(94 93 93)', color:'#FFF', justifyContent: 'space-between', 
          display: 'flex',marginTop:'30px'}}>
          <div style={{display:'flex',alignItems:'center', marginLeft:'20px'}}>
            <SettingsIcon style={{cursor:'pointer',fontSize:'30px'}} onClick={()=>{document.getElementById('btn_drawer_pass').click()}} />
          </div>
          <div style={{width:'100%',backgroundColor:'rgb(94 93 93)', color:'#FFF',overflow:'auto', fontSize:'50px'}}>
          {language[language_i].kitchen_title}
          </div>
        </div>

        <div style={{ cursor: 'pointer', width: '100%', height:'3px', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x'}}>
          <div style={{ width: '100%', color: '#1d2225' }}>a</div>
        </div>

        <div>
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <input type="text" id="selBtnVal" name="selBtnVal" style={{display:'none'}}></input>
        </div>

        <div style={{ paddingBottom: '20px', width: '100%', height:'calc(100% - 155px)'}}>

          <div style={{width:'100%',display:'flex', flexWrap:'wrap', height:'100%'}}>

            <div style={{height:'100%',width:'100%', overflow:'auto', display:'flex', flexWrap: 'wrap'}}>
              {
                line_items.map((val,index)=>(

                  <div style={{width:'400px', overflow:'', margin:'auto', marginTop:'10px'}}>
                    <div style={{height:'100%',width:'100%', backgroundColor:'#223333'}}>
                      <h2 style={{textAlign:'center',fontFamily:'auto',padding:'5px',color:'#ff7f50'}}>{seatnum[index]}</h2>

                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[0]!==""?classes.show:classes.hidd}>
                            {val[0]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[1]!==""?classes.show:classes.hidd}>
                            {val[1]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[2]!==""?classes.show:classes.hidd}>
                            {val[2]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[3]!==""?classes.show:classes.hidd}>
                            {val[3]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[4]!==""?classes.show:classes.hidd}>
                            {val[4]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[5]!==""?classes.show:classes.hidd}>
                            {val[5]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[6]!==""?classes.show:classes.hidd}>
                            {val[6]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[7]!==""?classes.show:classes.hidd}>
                            {val[7]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[8]!==""?classes.show:classes.hidd}>
                            {val[8]}
                      </ul>
                      <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={val[9]!==""?classes.show:classes.hidd}>
                            {val[9]}
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div style={{ cursor: 'pointer', width: '100%', height:'3px', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x'}}>
            <div style={{ width: '100%', color: '#1d2225' }}>a</div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' , height:'65px', paddingTop:'10px' }}>
              <div className={value==='clerk' ? classes.show_customer : classes.hide_customer} style={{marginLeft:'22px'}}>
                {/* {if(value === "kitchen" || value === "clerk")} */}
                <img src="./assets/seat.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                  if(value==="clerk")
                  {
                    history.push(({
                      pathname: '/seat'
                      //state: { fire_seatnum:props.fire_seatnum,fire_seatkey:props.fire_seatkey,fire_seatordernum:props.fire_seatordernum, fire_checkoutId:props.fire_checkoutId, isCartOpen: false}
                    }))
                  }}}
                />
              </div>
              <div className={value!=='kitchen' ? classes.show_customer : classes.hide_customer} style={{}}>
                <img src="./assets/menu.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                  // if(value === "customers")
                  {
                    history.push(({
                    pathname: `/products/${props.location.state.fire_seatkey}`,
                    state: { seatNum:props.location.state.fire_seatnum,seatKey:props.location.state.fire_seatkey,seatOrdernum:props.location.state.fire_seatordernum, checkoutId:props.location.state.fire_checkoutId, isCartOpen: false}}))
                  }
                  // else if(value === "clerk")
                  // {
                  //   history.push('/seat')
                  // }
                }} />
              </div>

              <div style={{width:'70px',borderBottom:'groove', marginBottom:'10px',backgroundColor:'#434343',borderRadius:'5px'}}>
                <div style={{width:'45px', height:'45px',margin:'auto'}}>
                  <img src="./assets/kitchen.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{init_data()}}/>
                </div>
              </div>

              <div className={value!=='kitchen' ? classes.show_customer : classes.hide_customer} >
              <img src="./assets/printer.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                  // if(value === "customers")
                  {
                    history.push(({
                    pathname: `/products/${props.location.state.fire_seatkey}`,
                    state: { seatNum:props.location.state.fire_seatnum,seatKey:props.location.state.fire_seatkey,seatOrdernum:props.location.state.fire_seatordernum, checkoutId:props.location.state.fire_checkoutId, isCartOpen: true}}))
                  }
                  // else if(value === "clerk")
                  // {
                  //   history.push('/seat')
                  // }
                }} />
              </div>
          </div>
        </div>
      </div>
      {/* <div style={{ width: '27px',height:'100%',zIndex:2000, backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    license_key: state.license,
  };
}
export default connect(mapStateToProps)(App);
