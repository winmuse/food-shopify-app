import React, { useEffect ,useState} from 'react';
import LineItem from './LineItem';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
//import firebaseAction from '../firebaseAction';
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
  show:{
    display:'initial'
  },
  hidd:{
    display:'none'
  }
}));

var lang_index = 0;
function CartModal (props) {
  const classes=useStyles();
  const history=useHistory();

  lang_index = props.lang_index;
  const [language_i,setLanguage_I] = React.useState(0);
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
          setLanguage_I("0");
          value = "customers";
        }
        else
        {
          setLanguage_I(setting[0].language);
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
    let line_items1 = [];
    let line_items2 = [];
    let line_items3 = [];
    let line_items4 = [];
    let line_items5 = [];
    let line_items6 = [];
    let line_items7 = [];
    let line_items8 = [];
    let line_items9 = [];
    let line_items10 = [];

    for(var index=0;index<props.checkout.lineItems.length;index++)
    {
      var map = {}

      for (var i=0; i < props.checkout.lineItems[index].customAttributes.length; i++){
          map[props.checkout.lineItems[index].customAttributes[i].key] = props.checkout.lineItems[index].customAttributes[i]
      }
      if(map["order"] == undefined)
        continue;
      if(map["order"].value.includes(props.ordernum+"/") === false)
        continue;
      if(map["order"].value.includes("1/"))
      {
        line_items1.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={1}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("2/"))
      {
        line_items2.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={2}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("3/"))
      {
        line_items3.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={3}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("4/"))
      {
        line_items4.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={4}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("5/"))
      {
        line_items5.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={5}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("6/"))
      {
        line_items6.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={6}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("7/"))
      {
        line_items7.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={7}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("8/"))
      {
        line_items8.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={8}
            inc_dec_show = {'show'}
          />
        );
      }
      else if(map["order"].value.includes("9/"))
      {
        line_items9.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={9}
            inc_dec_show = {'show'}
          />
        );
      }
      else{
        line_items10.push(
          <LineItem
            updateQuantityInCart={props.updateQuantityInCart}
            removeLineItemInCart={props.removeLineItemInCart}
            key={props.checkout.lineItems[index].id.toString()}
            line_item={props.checkout.lineItems[index]}
            order={10}
            inc_dec_show = {'show'}
          />
        );
      }
    }
    // let line_items = props.checkout.lineItems.map((line_item) => {
    //   return (
    //     <LineItem
    //       updateQuantityInCart={props.updateQuantityInCart}
    //       removeLineItemInCart={props.removeLineItemInCart}
    //       key={line_item.id.toString()}
    //       line_item={line_item}
    //     />
    //   );
    // });

    return (
      <div className={`Cart ${props.isCartModalOpen ? 'Cart--open' : ''}`} style={{height:'100vh', overflow:'auto', backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between', flexWrap:'wrap'}}>
        <header className="Cart__header">
          <h2></h2>
          <button
            onClick={props.handleCartModalClose}
            className="Cart__close">
            ×
          </button>
        </header>
        <div style={{ margin:'0 auto', cursor:'pointer', backgroundColor:'#5c69c4', height:'45px',width: '50%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around',color:'#fff',fontFamily:'Rotobo',fontSize:17 }} onClick={props.updateOrderNum}>
          <div style={{height:'100%',width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>{language[language_i].cart_modal_button}</div>
          </div>
        </div>
        <div style={{height: 'calc(100% - 230px)',overflow:'auto',margin:'auto'}}>
          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items10.length!==0?classes.show:classes.hidd}>
            {line_items10}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items9.length!==0?classes.show:classes.hidd}>
            {line_items9}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items8.length!==0?classes.show:classes.hidd}>
            {line_items8}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items7.length!==0?classes.show:classes.hidd}>
            {line_items7}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items6.length!==0?classes.show:classes.hidd}>
            {line_items6}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items5.length!==0?classes.show:classes.hidd}>
            {line_items5}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items4.length!==0?classes.show:classes.hidd}>
            {line_items4}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items3.length!==0?classes.show:classes.hidd}>
            {line_items3}
          </ul>

          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={line_items2.length!==0?classes.show:classes.hidd}>
            {line_items2}
          </ul>

          <ul style={{overflow:'auto'}} className={line_items1.length!==0?classes.show:classes.hidd}>
            {line_items1}
          </ul>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small" style={{fontFamily:'Roboto',fontSize:20,color:'wheat',marginLeft:'15px'}}>{language[language_i].cart_total}</div>
          <div className="Cart-info__pricing" style={{fontFamily:'Roboto',fontSize:20,marginRight:'40px'}}>
            <span className="pricing" style={{color:'#f7a0a5'}}>¥ {props.checkout.totalPrice}</span>
          </div>
        </div>
        <div style={{ margin:'auto',marginBottom:'20px', cursor:'pointer', backgroundColor:'#5c69c4', height:'45px',width: '50%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around',color:'#fff',fontFamily:'Rotobo',fontSize:17 }} onClick={props.updateOrderNum}>
          <div style={{height:'100%',width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>{language[language_i].cart_modal_button}</div>
          </div>
        </div>
      </div>
    )
  // }
}
function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    seatkey:state.seatkey,
    license_key: state.license,
  };
}
export default connect(mapStateToProps)(CartModal);
