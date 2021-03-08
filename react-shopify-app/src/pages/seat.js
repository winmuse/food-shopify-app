import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import Client from 'shopify-buy';
import '../shared/app.css';
import Switch from "react-switch";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {language} from '../language';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import MenuItem from '@material-ui/core/MenuItem';

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
import FormLabel from '@material-ui/core/FormLabel';
import '../config/global.js';
import {ChangeQrUrl} from '../reducers/action';

import {genQRInfo} from "../qrcode/actions";
import {connect} from 'react-redux';
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
    minWidth: 120,
    justifyContent:'center'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  show_delete_icon: {
    display:'flex',
    alignItems:'center',
    marginLeft:'20px'
  },
  hide_delete_icon: {
    display:'none'
  },
  show_customer:{
    display:''
  },
  hide_customer:{
    display:'none'
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

function App(props) {
  const classes = useStyles();
  const classesSet = useStylesPassword();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const history = useHistory();
  const [checkoutId, setCheckoutId] = useState([]);

  const [seatnum,setSeatnum]=useState(0);
  const [seatkey,setSeatkey]=useState(0);
  const [seatordernum,setSeatordernum]=useState(0);
  const [seatflag,setSeatflag]=useState(true);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [statepassword, setStatePassword] = React.useState({
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

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };
  const handleChangeCheckPassword = (prop) => (event) => {
    setValuesCheck({ ...valuesCheck, [prop]: event.target.value });
  };
  const handleChangeSetPassword = (prop) => (event) => {
    setValuesSetPassword({ ...valuesSetPassword, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPasswordCheck = () => {
    setValues({ ...valuesCheck, showPassword: !values.showPassword });
  };
  const handleClickShowPasswordSet = () => {
    setValues({ ...valuesSetPassword, showPassword: !values.showPassword });
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
    setValuesSetPassword({ ...valuesSetPassword, password: '' });
    setValue(settingArray[0].value);
    setValues({ ...values, password: settingArray[0].password });
  };
  const toggleDrawerPass = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setStateCheck({ ...statecheck, [anchor]: open });
    valuesSetPassword.password = '';
  };
  const toggleDrawerSetPass = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setStatePassword({ ...statepassword, [anchor]: open });
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
  const [valuesSetPassword, setValuesSetPassword] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });

  var lang_index = props.lang_index;
  const list = (anchor) => (
    <div className={classes.root} style={{display: 'flex',flexDirection:'column',backgroundColor:'rgb(14, 17, 18)',height:'100%',justifyContent:'space-between'}}>
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
      <Button type="submit" variant="outlined" color="primary" className={classesSet.button} style={{fontSize:'20px',margin:'30px 30px',color:'#fff',borderColor:'#fff',backgroundColor:'#5c69c4'}} onClick={()=>{handleSettingSubscription(anchor)}}>
      更新計画
      </Button>
      </div>
    </div>
  );

  const checklist = (anchor) => (
    <div className={classes.root} style={{display: 'flex',flexDirection:'column',backgroundColor:'rgb(14, 17, 18)',height:'100%',justifyContent:'space-between'}}>
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
                  onClick={handleClickShowPasswordCheck}
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

  const setpasswordlist = (anchor) => (
    <div className={classes.root} style={{display: 'flex',flexDirection:'column',backgroundColor:'rgb(14, 17, 18)',height:'100%',justifyContent:'space-between'}}>
      <div style={{display: 'flex',flexDirection:'column'}}>
      <FormControl className={clsx(classesSet.margin)} variant="outlined">
        <FormLabel component="legend" style={{fontFamily:'monospace', fontSize:'20px',margin:'30px 30px',color:'#fff',borderBottom:'1px solid #fff'}}>設定</FormLabel>
      </FormControl>
        <FormLabel component="legend" style={{fontFamily:'monospace', fontSize:'15px',margin:'30px 30px',color:'#fff'}}>パスワードを設定しなければします。</FormLabel>

      <FormControl className={clsx(classesSet.margin, classesSet.textField)} style={{margin:'30px'}} variant="outlined">
        <InputLabel htmlFor="setpassword" style={{fontSize:'20px',color:'#fff'}}>パスワード</InputLabel>
          <OutlinedInput
            style={{color:'#fff'}}
            id="setpassword"
            autoFocus={true}
            type={valuesSetPassword.showPassword ? 'text' : 'password'}
            value={valuesSetPassword.password}
            onChange={handleChangeSetPassword('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{color:'#fff'}}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordSet}
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
      <Button type="submit" variant="outlined" color="primary" className={classesSet.button} style={{fontSize:'20px',margin:'0 30px',color:'#fff',borderColor:'#fff',backgroundColor:'#5c69c4'}} onClick={()=>{handleSettingSet(anchor)}}>
      確認
      </Button>
      </div>
    </div>
  );
  const [value, setValue] = useState('customers');
  const [password, setPassword] = useState('');

  const [language_i,setLanguage_I] = React.useState(0);

  const [settingArray, SetSettingArray] = useState(Array);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSettingSubscription = (anchor) => {
    history.push('/register');
  }

  const handleSetting = (anchor) => {
    //firebaseAction.updateSettingValue(settingArray[0].key, value);
    //firebaseAction.updateSettingPassword(settingArray[0].key, password);

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
      setValuesCheck({ ...valuesCheck, password: password });
      settingArray[0].password = password;
    })
    .catch(err => {
        console.log(err);
    });
    if(value === "kitchen")
    {
      history.push(({
        pathname: '/checkout_confirm',
        state: { fire_seatnum:seatnum,fire_seatkey:seatkey,fire_seatordernum:seatordernum, fire_checkoutId:checkoutId, isCartOpen: false}}))
    }
    else if(value === "clerk")
      history.push('/seat')
    setState({ ...state, [anchor]: open });
  }
  const handleSettingCheck = (anchor) => {
    if(valuesCheck.password === settingArray[0].password)
    {
      setState({ ...state, [anchor]: true });
      setStateCheck({ ...statecheck, [anchor]: false });
    }
  }
  const handleSettingSet = (anchor) => {
    if(valuesCheck.password === settingArray[0].password)
    {
      setState({ ...state, [anchor]: true });
      setStateCheck({ ...statecheck, [anchor]: false });
    }
    fetch(global.api_domain+"/api/settings/update", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        value:value,
        password:valuesSetPassword.password,
        id: settingArray[0].key
      })
    })
    //.then(response => response.json())
    .then(response => {
      setValuesCheck({ ...valuesCheck, password: valuesSetPassword.password });
      setPassword(valuesSetPassword.password);
      settingArray[0].password = valuesSetPassword.password;
      setValues({ ...values, password: valuesSetPassword.password });
      setState({ ...state, [anchor]: true });
      setStateCheck({ ...statecheck, [anchor]: false });
      setStatePassword({ ...statepassword, [anchor]: false });
    })
    .catch(err => {
        console.log(err);
    });
  }
  const init_settings=()=>{
    console.log("init_setting-----",props.license_key);
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
            setting.push({key:response.id, value:response.value, password:response.password,language:response.language});
            console.log(setting);
            setValue(setting[0].value);
            setPassword(setting[0].password);
            setLanguage_I(setting[0].language);

            SetSettingArray(setting);
            setValues({ ...values, password: setting[0].password });
            setValuesCheck({ ...valuesCheck, password: '' });
          })
          .catch(err => {
              console.log(err);
          });
        }
        else
        {
          setValue(setting[0].value);
          setPassword(setting[0].password);
          setLanguage_I(setting[0].language);
        }
        SetSettingArray(setting);
        setValues({ ...values, password: setting[0].password });
        setValuesCheck({ ...valuesCheck, password: '' });
      })
      .catch(err => {
          console.log(err);
      });
  }
  const init_seats=()=>{
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
        let seatNums = 0;
        for(var i=0; i<response.length; i++)
        {
          if((global.price_list==='lite' && seatNums<6) || (global.price_list==='standard' && seatNums<12) || (global.price_list==='premium') || (global.price_list==='unlimit'))
          {
            seats.push({key:response[i].id, seat:response[i].seat, text:response[i].text, email:response[i].email, checkoutId:response[i].checkoutId, flag:response[i].flag});
          }
          seatNums++;
        }
        SetSeat(seatArray => seats);
        if(seats.length>0)
        {
          setSeatflag(Boolean(seats[0].flag));
          setSeatnum(parseInt(1));
          setCheckoutId(seats[0].checkoutId);
          setSeatkey(seats[0].key);
          setSeatordernum(seats[0].seat);
        }
      })
      .catch(err => {
          console.log(err);
      });
  }
  const [seatArray, SetSeat] = useState(Array);
  const [seatnums, SetSeatNums] = useState(0);

  useEffect(() => {
    if(props.license_key === 0 || props.license_key === null || props.license_key === undefined)
      history.push("/register");
    handleToggle();
    init_seats();

    setTimeout(function () {
      handleClose();
    }, 1500)
    init_settings();
  }, []);
  function onAdd(){
    if((global.price_list==='lite' && seatArray.length<6) || (global.price_list==='standard' && seatArray.length<12) || (global.price_list==='premium') || (global.price_list==='unlimit'))
    {
      if(value==='clerk')
      {
        let num = seatArray.length + 1;
        if(num < 10)num = "0" + num;

        fetch(global.api_domain+"/api/seats/create", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
              license_key:props.license_key,
              seat: num,
              text: "seat"+num,
              email: "seat"+num+"@jp.com",
              checkoutId: "",
              flag: true
            })
          })
          //.then(response => response.json())
          .then(response => {
            init_seats();
          })
          .catch(err => {
              console.log(err);
          });
      }
    }
    else
    {
      alert(language[language_i].seat_price_alert);
    }
  }
  function onSetting(){

  }
  function onSeatDel(seat){
    onSeatDelOk(seat);
  };

  async function onSeatDelOk(seat){
    //await firebaseAction.delete(seat.key);
    fetch(global.api_domain+"/api/seats/delete", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        license_key:props.license_key,
        id: seat.key
      })
    })
    //.then(response => response.json())
    .then(response => {
      init_seats();
    })
    .catch(err => {
        console.log(err);
    });
  }

  function txtChange(index){
    //firebaseAction.update(seatArray[index].key, seatArray[index].text);
  }
  async function OnChangeCheck(index){
    //await firebaseAction.updateFalg(seatArray[index].key, seatArray[index].flag);
    fetch(global.api_domain+"/api/seats/update", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        flag:seatArray[index].flag,
        id: seatArray[index].key
      })
    })
    //.then(response => response.json())
    .then(response => {
      init_seats();
    })
    .catch(err => {
        console.log(err);
    });
  }

  const [flag,setFlag]=React.useState(true)
  // const handleChange=(e)=>{
  //   seatArray[e.target.name].text = e.target.value;
  //   SetSeat(seatArray);
  //   setFlag(!flag);
  //   txtChange(e.target.name);
  // }
  const handleChangeseat=(index, flag, key, ordernum, checkoutid)=>{

    setSeatflag(Boolean(flag));
    setSeatnum(parseInt(index+1));
    setCheckoutId(checkoutid);
    setSeatkey(key);
    setSeatordernum(ordernum);

    let selBtn = "seat_"+index;
    let selTxt = "txt_"+index;

    let beforeBtn = document.getElementById("selBtnVal").value;
    let beforeTxt = document.getElementById("selTxtVal").value;

    if(beforeBtn != ""){
      if(selBtn != beforeBtn){

        document.getElementById(selBtn).style.border = "solid 3px rgb(0 127 187)";
        if(document.getElementById(beforeBtn) !== null)
          document.getElementById(beforeBtn).style.border = "solid 1px rgb(0 127 186)";

        document.getElementById(selTxt).style.color = "#FFFFFF";
        if(document.getElementById(beforeTxt) !== null)
          document.getElementById(beforeTxt).style.color = "#FFFFFF";

        document.getElementById("selBtnVal").value = selBtn;
        document.getElementById("selTxtVal").value = selTxt;

      }

    }else{

      document.getElementById(selBtn).style.border = "solid 3px rgb(0 127 187)";
      document.getElementById(selTxt).style.color = "#FFFFFF";

      document.getElementById("selBtnVal").value = selBtn;
      document.getElementById("selTxtVal").value = selTxt;

    }
  }

  const handleprodect=()=>{
    if(seatflag)
    {
      if(value === "kitchen")
      {
        history.push(({
        pathname: '/checkout_confirm',
        state: { fire_seatnum:seatnum,fire_seatkey:seatkey,fire_seatordernum:seatordernum, fire_checkoutId:checkoutId, isCartOpen: false}}))
      }
      else
      {
        console.log("handleprodect",seatnum);
        if(seatnum>0)
        {
          history.push(({
          pathname: `/products/${seatkey}`,
          state: { seatNum:seatnum,seatKey:seatkey,seatOrdernum:seatordernum, checkoutId:checkoutId, isCartOpen: false}}))
        }
        else
        {
          alert(language[language_i].seat_setting_alert);
        }
      }
    }
    else{
      alert(language[language_i].seat_flag_alert);
    }
  }

  return (
    <div style={{ textAlign: 'center', height: '100vh', margin: 'auto', backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between' }}>
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
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawerSetPass(anchor, true)} id="btn_drawer_setpass" style={{ display: 'none' }}>{anchor}</Button>
            <Drawer anchor={anchor} open={statepassword[anchor]} onClose={toggleDrawerSetPass(anchor, false)}>
              {setpasswordlist(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <input type="text" id="selBtnVal" name="selBtnVal" style={{display:'none'}}></input>
      <input type="text" id="selTxtVal" name="selTxtVal" style={{display:'none'}}></input>

      <div style={{width:'100%',height:'100%'}}>
        <div style={{ textAlign: 'center', width: '100%', height: '70px', margin: 'auto', backgroundColor: 'rgb(94 93 93)', color:'#FFF', justifyContent: 'space-between', 
          display: 'flex',marginTop:'30px'}}>
          <div className={value==='clerk' ? classes.show_delete_icon : classes.hide_delete_icon} >
            <AddIcon style={{cursor:'pointer'}} onClick={()=>onAdd()} style={{fontSize:'30px'}}/>
          </div>
          <div style={{display:'flex',alignItems:'center', marginLeft:'20px'}}>
            <SettingsIcon style={{cursor:'pointer',fontSize:'30px'}} onClick={()=>{
               if(seatArray.length>0 || settingArray[0].password.length>0)
                 document.getElementById('btn_drawer_pass').click();
               else
                 document.getElementById('btn_drawer_setpass').click();
              }} />
          </div>
          <div style={{width:'100%',backgroundColor:'rgb(94 93 93)', color:'#FFF',overflow:'auto', fontSize:'50px'}}>
          {language[language_i].seat_title}
          </div>
        </div>
        <div style={{ width: '100%', height: 'calc(100% - 230px)', overflow: 'auto', paddingRight: 15, display: 'flex', flexWrap: 'wrap', 
        justifyContent: 'space-around', paddingTop:'10px'}}>
          {
            seatArray.map((val, index) => {
              return (
                // <div id={'seat_'+index} style={{padding:'0px 15px 0px 0px', marginBottom:'5px', borderRadius:'15px' , border: '1px solid #FFFFFF', display: 'flex', width:'90%',  
                // flexWrap: 'wrap', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div id={'seat_'+index} style={{padding:'0px 15px 0px 0px', marginBottom:'5px', borderRadius:'5px' , border: '1px solid rgb(0 127 186)', backgroundColor:'#02557d', display: 'flex', width:'90%',  
                  flexWrap: 'wrap', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', alignItems: 'center', justifyContent: 'space-between' }}>

                  <div style={{ color: '#fff', width: '50px', height: '50px', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                    {
                        <div className={value==='clerk' ? classes.show_delete_icon : classes.hide_delete_icon} >
                          <DeleteForeverIcon style={{ alignSelf: 'center', width: '60%', height: '60%' }}
                          onClick={() => { if (window.confirm(language[language_i].seat_delete_alert)) onSeatDel(val) } }/>
                        </div>
                    }
                  </div>

                  <div id={'txt_'+index} variant="contained" style={{cursor:'pointer', color: '#fff', fontSize: 20, fontWeight: 'bold', padding: 15, height: 50, 
                    minWidth: '40vw', borderRadius: 10 }} onClick={()=>handleChangeseat(index, val.flag, val.key, val.seat, val.checkoutId)}
                  >
                    {language[language_i].seat_name} {index+1}
                  </div>
                  <div>
                    <div className={value==='clerk' ? classes.show_delete_icon : classes.hide_delete_icon}>
                      <Switch onChange={(bl) => {
                            seatArray[index].flag = bl;

                            SetSeat(seatArray => seatArray);

                            OnChangeCheck(index);
                          }
                      } checked={val.flag} height={20} />
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

        <div style={{ cursor:'pointer', backgroundColor:'#5c69c4', height:'40px',width: '95%', display: 'flex', display:'inline-flex', flexWrap: 'wrap', marginTop:'20px',justifyContent: 'space-around',left:'auto',color:'#fff',fontFamily:'Rotobo',fontSize:17 }} onClick={{}}
          onClick={handleprodect}
        >
          <div style={{width:'20%',height:'100%',borderRight:'1px solid #fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>{language[language_i].seat_name} {parseInt(seatnum)}</div>
          </div>
          <div style={{height:'100%',width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>{language[language_i].seat_in_menu}</div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' , height:'65px', paddingTop:'10px'}}>
            {/* width: 70px;border-bottom: groove;margin-bottom: 10px;background-color: #434343;border-radius: 5px; */}
            <div style={{width:'70px',borderBottom:'groove', marginBottom:'10px',backgroundColor:'#434343',borderRadius:'5px'}}>
              <div style={{width:'45px', height:'45px',margin:'auto'}}>
                <img src="./assets/seat.png" alt="alt" style={{cursor:'pointer', width:'100%', height:'100%'}}/>
              </div>
            </div>

            <div>
              <img src="./assets/menu.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                console.log("assets/menu.png",seatnums);
                if(seatnum>0)
                {
                  history.push(({
                  pathname: `/products/${seatkey}`,
                  state: { seatNum:seatnum,seatKey:seatkey,seatOrdernum:seatordernum, checkoutId:checkoutId, isCartOpen: false}}))
                }
                else
                {
                  alert(language[language_i].seat_setting_alert);
                }

              }}  />
            </div>

            <div className={value!=='customers' ? classes.show_customer : classes.hide_customer} >
              {/* {if(value === "kitchen" || value === "clerk")} */}
              <img src="./assets/kitchen.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                if(seatnum>0)
                {
                  history.push(({
                    pathname: '/checkout_confirm',
                    state: { fire_seatnum:seatnum,fire_seatkey:seatkey,fire_seatordernum:seatordernum, fire_checkoutId:checkoutId, isCartOpen: false}}))
                }
                else
                {
                  alert(language[language_i].seat_setting_alert);
                }
                }} />
            </div>
            <div>
              <img src="./assets/printer.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                console.log("assets/printer.png",seatnums);
                if(seatnum>0)
                {
                  history.push(({
                  pathname: `/products/${seatkey}`,
                  state: { seatNum:seatnum,seatKey:seatkey,seatOrdernum:seatordernum, checkoutId:checkoutId, isCartOpen: true}}))
                }
                else
                {
                  alert(language[language_i].seat_setting_alert);
                }
              }}  />
            </div>
        </div>
      </div>
      {/* <div style={{ width: '27px', backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    license_key: state.license,
  };
}
const mapDispatchToProps = {
  genQRInfo
};
export default connect(mapStateToProps,mapDispatchToProps)(App);