import React, {Component,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebaseAction from '../firebaseAction';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  bg1: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#223030'
  },
  bg2: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#223535'
  },
  bg3: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#224040'
  },
  bg4: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#221010'
  },
  bg5: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#221515'
  },
  bg6: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#221d1d'
  },
  bg7: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#222020'
  },
  bg8: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#222525'
  },
  bg9: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#222d2d'
  },
  bg10: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#223030'
  },
  show_customer:{
  },
  hide_customer:{
    display:'none'
  },
}));


function LineItem (props) {
  let value = "";
  const classes=useStyles();
  const [value_user, setValueUser] = React.useState('');

  const decrementQuantity=(lineItemId)=> {
    const updatedQuantity = props.line_item.quantity - 1
    props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  const incrementQuantity=(lineItemId)=> {
    const updatedQuantity = props.line_item.quantity + 1
    props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  useEffect(() => {
    // firebaseAction.getSetting(res => {
    //   let setting = [];
    //   res.forEach(element => {
    //     let item = element.val();
    //     setting.push({key:element.key, value:item.value, password:item.password,language:item.language});
    //   });

    //   {
    //     setValueUser(setting[0].value);
    //   }
    // });
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
        }
        else
        {
          setValueUser(setting[0].value);
        }
      })
      .catch(err => {
          console.log(err);
      });
  }, [])

  // render() {
    return (
      <div className={props.order===1?classes.bg1:props.order===2?classes.bg2:props.order===3?classes.bg3:props.order===4?classes.bg4:props.order===5?classes.bg5:props.order===6?classes.bg6:props.order===7?classes.bg7:props.order===8?classes.bg8:props.order===9?classes.bg9:props.order===10?classes.bg10:""}>
        <li className="Line-item" style={{marginBottom:'1px'}}>
          <div className="Line-item__img">
            {props.line_item.variant.image ? <img src={props.line_item.variant.image.src} alt={`${props.line_item.title} product shot`} 
            style={{borderRadius:'5px', border:'2px solid rgb(94, 93, 93)',width:'100%',height:'100%'}} /> : null}
          </div>
          <div className="Line-item__content">
            <div className="Line-item__content-row">
              {/* <div className="Line-item__variant-title">
                {props.line_item.variant.title}
              </div> */}
              <span className="Line-item__title">
                {props.line_item.title}
              </span>
            </div>
            <div className="Line-item__content-row">
              <div className="Line-item__quantity-container">
                  <button className="Line-item__quantity-update" style={props.inc_dec_show==='show' ? {display:''} : {display:'none'}} onClick={() => decrementQuantity(props.line_item.id)}>-</button>
                <span className="Line-item__quantity">{props.line_item.quantity}</span>
                  <button className="Line-item__quantity-update" style={props.inc_dec_show==='show' ? {display:''} : {display:'none'}} onClick={() => incrementQuantity(props.line_item.id)}>+</button>
              </div>
              <span className="Line-item__price">
              ¥ { (props.line_item.quantity * props.line_item.variant.price).toFixed(0) }
              </span>
              <div className={value_user!=='customers' ? classes.show_customer : classes.hide_customer} >
                <button className="Line-item__remove" onClick={()=> props.removeLineItemInCart(props.line_item.id)}>×</button>
              </div>
            </div>
          </div>
        </li>
      </div>
    );
  // }
}
function mapStateToProps(state) {
  return {
    lang_index: state.authen,
    license_key: state.license,
  };
}
export default connect(mapStateToProps)(LineItem);
