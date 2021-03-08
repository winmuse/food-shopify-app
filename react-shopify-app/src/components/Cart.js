import React, { useEffect ,useState,useRef} from 'react';
import LineItem from './LineItem';
import LineItemPrint from './LineItemPrint';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
//import firebaseAction from '../firebaseAction';
import ImageUploader from "react-images-upload";
import {language} from '../language';



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
  show_customer:{
    display:''
  },
  hide_customer:{
    display:'none'
  },
  cartitem:{
    overflow:'auto',
    borderRight:'1px solid #9ba8b7',
    width:'50%',
    '@media (max-width:768px)':{
      width:'100%'
    }
  },
  cart_footer:{
    padding: 20,
    width:'50%',color:'#fff',alignSelf:'center', overflow:'auto',
    '@media (max-width:768px)':{
      width:'100%'
    }
  }
}));

var lang_index = 0;
//const value_user = "clerk";


function Cart (props) {
  const componentRef = useRef();
  const classes=useStyles();
  const history=useHistory();
  const [value_user, setValueUser] = React.useState('customers');
  const [settingKey, setSettingKey] = React.useState('');
  const [imagePreviewUrl,setImagepreviewUrl]=React.useState("");
  const [img_file, setImgFile] = React.useState('/assets/1_.png');
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  lang_index = props.lang_index;

  const init=()=>{
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
          setting.push({key:response[i].id, value:response[i].value, password:response[i].password,img:response[i].img,language:response[i].language});
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
          setLanguage_I("0");
          value = "customers";
        }
        else
        {
          setSettingKey(setting[0].key);
          setValueUser(setting[0].value);
          setLanguage_I(setting[0].language);
          if(setting[0].img == "")
            setImagepreviewUrl(global.api_domain+"/default_logo.png");
          else
            setImagepreviewUrl(global.api_domain+"/"+setting[0].img);
          value = setting[0].value;
        }
      })
      .catch(err => {
          console.log(err);
      });
  }
  useEffect(() => {
    init(props);
    // handleInputUrl();
    // genQRInfo(window.location.href);
  }, []);

  const openCheckout=()=> {
    //makeStyles-cartitem-41
    //var content = document.getElementById("makeStyles-cartitem-41");

    // var content = document.getElementById("qr_img");
    // var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    // document.getElementById("ifmcontentstoprint").setAttribute("class", "QrframeMax");
    // pri.document.open();
    // pri.document.write(content.innerHTML);
    // pri.document.close();
    // pri.focus();
    // pri.print();
    // document.getElementById("ifmcontentstoprint").setAttribute("class", "QrframeMin");





console.log("---",global.price_list);
    //if(value_user==="clerk")
    {
      window.open(props.checkout.webUrl);

      // firebaseAction.updateSeat(props.seatkey, "0");
      // firebaseAction.updateCheckoutID(props.seatkey, "");
  
      console.log("a-----------",props.fire_seatkey);
      fetch(global.api_domain+"/api/seats/update", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
          checkoutId:"",
          seat:"0",
          id: props.fire_seatkey
        })
      })
      //.then(response => response.json())
      .then(response => {
        //history.push('/seat');
        props.handleCartClose();
      })
      .catch(err => {
          console.log(err);
      });
    }
    //else
    {
      //props.handleCartClose();
    }
  }
  const [file, setFile] = React.useState("");
  const [language_i,setLanguage_I] = React.useState(0);
  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }
  // render() {
    let line_items = props.checkout.lineItems.map((line_item) => {
      return (
        <LineItem
          updateQuantityInCart={props.updateQuantityInCart}
          removeLineItemInCart={props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
          inc_dec_show={value_user ==='customers'?'hide':'show'}
        />
      );
    });

    let print_items = props.checkout.lineItems.map((line_item) => {
      return (
        <LineItemPrint
          updateQuantityInCart={props.updateQuantityInCart}
          removeLineItemInCart={props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
          inc_dec_show={value_user ==='customers'?'hide':'show'}
        />
      );
    });

    class ComponentToPrint extends React.Component {
      render() {
        return (
          <table style={{backgroundColor:'#000',display:'none',marginTop:'100px !important',paddingTop:'100px !important'}}>
            <div style={{width:'100',height:50}}></div>
            <ul className={classes.cartitem}>
              {print_items}
            </ul>
            <div style={{width:'100%',border:'1px solid #000'}}>
            </div>
            <div style={{textAlign:'center',width:'80%',margin:'auto'}}>
              <div className="Cart-info clearfix">
                <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:17}}>{language[language_i].cart_subtotal}</div>
                <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:17}}>
                  <span className="pricing" style={{color:'#000',fontSize:'20px', fontWeight:'bold'}}>¥ {props.checkout.subtotalPrice}</span>
                </div>
              </div>
              <div className="Cart-info clearfix">
                <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:17}}>{language[language_i].cart_taxes}</div>
                <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:17}}>
                  <span className="pricing" style={{color:'#000',fontSize:'20px', fontWeight:'bold'}}>¥ {props.checkout.totalTax}</span>
                </div>
              </div>
              <div className="Cart-info clearfix">
                <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:17}}>{language[language_i].cart_total}</div>
                <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:17}}>
                  <span className="pricing" style={{color:'#000',fontSize:'20px', fontWeight:'bold'}}>¥ {props.checkout.totalPrice}</span>
                </div>
              </div>
              <div className="imgPreview" id="custom-file-input" style={{alignItems:'center',alignSelf:'center',display:'flex',justifyContent:'center',width:'100%'}}>
                  <img src={imagePreviewUrl } style={{borderRadius:'15px', width:150, height:'150px',display:'initial'}}/>
              </div>
              <div>
                <span  style={{fontFamily:'Roboto',fontSize:17}}>
                  {/* {language[language_i].seat_name + props.fire_seatnum+".     "} */}
                  {new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </table>
        );
      }
    }
    
    const handleImageChange=(event)=> {
      const data = new FormData()
      data.append('file', event.target.files[0]);
      axios.post(global.api_domain+"/upload", data)
          .then(res => {
            fetch(global.api_domain+"/api/settings/update", {
              "method": "POST",
              "headers": {
                  "content-type": "application/json",
                  "accept": "application/json"
              },
              "body": JSON.stringify({
                img:res.data.filename,
                id: settingKey
              })
            })
            //.then(response => response.json())
            .then(response => {
              init();
            })
            .catch(err => {
                console.log(err);
            });
          })
    }

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl } style={{borderRadius:'15px', width:'auto', height:'150px',display:'initial'}}/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (

      <div className={`Cart ${props.isCartOpen ? 'Cart--open' : ''}`} style={{height:'100vh', overflow:'auto', width:'100vw', 
      backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between', flexWrap:'wrap'}}>

        <div style={{width:'calc(100% - 27px)',height:'100%'}}>

          <div style={{height:'70px', width:'100%'}}>

          </div>
          <div style={{ cursor: 'pointer', width: '90%', height:'3px', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x'}}>
            <div style={{ width: '100%', color: '#1d2225' }}></div>
          </div>
          <div style={{width: '100%', height:'calc(100% - 150px)', overflow:'auto'}}>

            <div style={{width:'100%',display:'flex', flexWrap:'wrap', height:'100%'}}>

              <ul className={classes.cartitem}>
                {line_items}
              </ul>

              <div className={classes.cart_footer}>
                <div style={{marginBottom:'1vh'}}>
                  <div style={{display:'contents',textAlign:'center',justifyContent:'center'}}>
                      <div className="previewComponent">
                        <div className={value_user!=='customers' ? classes.show_customer : classes.hide_customer} >
                          <form>
                          <input id="custom-file-input" name="custom-file-input"
                            type="file"
                            onChange={(e)=>handleImageChange(e)} style={{fontVariant:'diagonal-fractions'}}/>
                          </form>
                        </div>
                        <div className="imgPreview" id="custom-file-input">
                          {$imagePreview}
                        </div>
                      </div>
                  </div>
                  <div className="Cart-info clearfix" style={{fontFamily:'Roboto',fontSize:17,textAlign:'center'}}>
                  {language[language_i].cart_logo_content1}<br />
                  {language[language_i].cart_logo_content2}<br />
                  {language[language_i].cart_logo_content3}<br /><br />
                  {language[language_i].cart_logo_content4}<br />
                  {language[language_i].cart_logo_content5}<br />
                  </div>
                </div>
                <div style={{width:'70%', margin: 'auto',}}>
                  <div style={{display:'flex',textAlign:'center',justifyContent:'center', borderRadius:15}}>
                    <div style={{ margin:'auto',marginBottom:'20px', borderRadius:'5px', cursor:'pointer', backgroundColor:'#5c69c4', height:'45px',width: '70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around',color:'#fff',fontFamily:'Rotobo',fontSize:17 }} onClick={()=>openCheckout()}>
                      <div style={{height:'100%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div className={value_user!=='customers' && (global.price_list==='premium' || global.price_list==='unlimit') ? classes.show_customer : classes.hide_customer} >
                          {/* if(value_user==="clerk") */}
                          <ReactToPrint
                            trigger={() => <div>{language[language_i].cart_pay_button_print}</div>}
                            content={() => componentRef.current}
                          />
                          <ComponentToPrint ref={componentRef} />
                        </div>
                        <div className={value_user==='customers' || (global.price_list==='lite' || global.price_list==='standard') ? classes.show_customer : classes.hide_customer} >
                            {language[language_i].cart_pay_button}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Cart-info clearfix">
                    <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:17}}>{language[language_i].cart_subtotal}</div>
                    <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:17}}>
                      <span className="pricing" style={{color:'#fff'}}>¥ {props.checkout.subtotalPrice}</span>
                    </div>
                  </div>
                  <div className="Cart-info clearfix">
                    <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:17}}>{language[language_i].cart_taxes}</div>
                    <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:17}}>
                      <span className="pricing" style={{color:'#fff'}}>¥ {props.checkout.totalTax}</span>
                    </div>
                  </div>
                  <div className="Cart-info clearfix">
                    <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:17}}>{language[language_i].cart_total}</div>
                    <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:17}}>
                      <span className="pricing" style={{color:'#fff'}}>¥ {props.checkout.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div style={{ cursor: 'pointer', width: '100%', height:'3px', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x', marginTop:'5px'}}>
              <div style={{ width: '100%', color: '#1d2225' }}></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' , height:'65px', paddingTop:'10px', marginLeft:'30px' }}>
              {/* <div>
                <img src="/assets/menu.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={props.handleCartClose} />
              </div>
              <div style={{borderBottom:'groove', marginBottom:'10px'}}>
                <img src="/assets/printer.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} />
              </div> */}
              <div className={value_user!=='customers' && (global.price_list==='premium' || global.price_list==='unlimit') ? classes.show_customer : classes.hide_customer} >
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
              <div style={{marginLeft:'35px'}}>
                  <img src="/assets/menu.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={props.handleCartClose} />
              </div>
              {/* <div style={{value !== 'customers' ? '':'none'}}> */}
              <div className={value_user!=='customers' ? classes.show_customer : classes.hide_customer} >
                {/* {if(value === "kitchen" || value === "clerk")} */}
                <img src="/assets/kitchen.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{
                  history.push(({
                    pathname: '/checkout_confirm',
                    state: { fire_seatnum:props.fire_seatnum,fire_seatkey:props.fire_seatkey,fire_seatordernum:props.fire_seatordernum, fire_checkoutId:props.fire_checkoutId, isCartOpen: false}
                  }))
                }} />
              </div>
              <div style={{width:'70px',borderBottom:'groove', marginBottom:'10px',backgroundColor:'#434343',borderRadius:'5px'}}>
                <div style={{width:'45px', height:'45px',margin:'auto'}}>
                  <img src="/assets/printer.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}}/>
                </div>
              </div>
            </div>
        </div>
        {/* <div style={{ width: '27px',height:'100%',zIndex:2000, backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div> */}
      </div>
    )
  // }
}
const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} style={{borderRadius:15, width:'50%', height:'200px'}}/>;
};
function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    license_key: state.license,
    seatkey:state.seatkey
  };
}
const mapDispatchToProps = {
};
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
