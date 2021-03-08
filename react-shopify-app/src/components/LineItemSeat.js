import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  show: {
    display:'',
    margin:'auto',
    width: '30%',
    borderRadius: '5px',
    backgroundColor: '#bbffa5',
    border: '0px'
  },
  hidd:{
    display:'none',
    margin:'auto'
  },
  // li_cls:{
  //    marginBottom: 20,
  //    overflow: 'hidden',
  //    backfaceCisibility: 'visible',
  //    minHight: 65,
  //    position: 'relative',
  //    opacity: 1,
  //    transition: 'opacity 0.2s ease-in-out'
  // },
  bg1: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#223030',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg2: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#223535',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg3: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#224040',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg4: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#221010',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg5: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#221515',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg6: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#221d1d',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg7: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#222020',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg8: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#222525',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg9: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#222d2d',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
  bg10: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#223030',
     overflow: 'hidden',
     backfaceCisibility: 'visible',
     minHight: 65,
     position: 'relative',
     opacity: 1,
     transition: 'opacity 0.2s ease-in-out'
  },
}));
function LineItemSeat (props) {
  const classes=useStyles();

  const incrementCount=(currentcheckoutid, lineItemId, index) =>{
    if(props.line_item.customAttributes.length===0)
    {
      props.updateQuantityInCart(currentcheckoutid, lineItemId, "1/1");
      return;
    }
    var updateCount = parseInt(props.line_item.customAttributes[0].value.split("/")[1],10);

    if(updateCount === props.line_item.quantity){

      document.getElementById("provide_"+index).style.display="";
      return;
    }
    updateCount = updateCount+1;
    props.updateQuantityInCart(currentcheckoutid, lineItemId, props.line_item.customAttributes[0].value.split("/")[0]+"/"+updateCount);
  }

  const orderLineItemCount=(lineItem,index,aaa)=>{
    if(props.line_item.customAttributes.length===0)
    {
      return props.line_item.quantity+"/0";
    }
    else if(props.line_item.customAttributes[0].value.split("/")[1] === undefined)
    {
      return props.line_item.quantity+"/0";
    }
    var count=parseInt(props.line_item.customAttributes[0].value.split("/")[1]);
    return props.line_item.quantity+"/"+props.line_item.customAttributes[0].value.split("/")[1];
  }

  const updateQuantity=(currentcheckoutid, lineItemId, updateCount)=> {
    var updateCount = parseInt(props.line_item.customAttributes[0].value.split("/")[1],10);
    updateCount = updateCount + 1;

    props.updateQuantityInCart(currentcheckoutid, lineItemId, props.line_item.customAttributes[0].value.split("/")[0]+"/"+updateCount);
    return;
  }

  return (
    // <li className={props.customAttributes<=props.line_item.quantity?`Line-item ${classes.show}`:`Line-item ${classes.hidd}`}>
    <li className={props.order===1?classes.bg1:props.order===2?classes.bg2:props.order===3?classes.bg3:props.order===4?classes.bg4:props.order===5?classes.bg5:props.order===6?classes.bg6:props.order===7?classes.bg7:props.order===8?classes.bg8:props.order===9?classes.bg9:props.order===10?classes.bg10:""}>
    <div className="Line-item__img">
          {props.line_item.variant.image ? <img src={props.line_item.variant.image.src} alt={`${props.line_item.title} product shot`} 
          style={{borderRadius:'5px', border:'2px solid rgb(94, 93, 93)', width:'100%', height:'100%'}}/> : null}
    </div>
    <div className="Line-item__content">
      <div style={{display: 'flex', textAlign:'left'}}>
        <span className="Line-item__title">
          {props.line_item.title}
        </span>
      </div>
      {/* <div className="Line-item__content-row" style={{width:'100%'}}>
        <div className="Line-item__quantity-container" style={{height:40, width:'153px', marginRight:'10px'}}>
          <button className="Line-item__quantity-update" style={{height:'100%', width:'50px'}} >-</button>
          <span className="Line-item__quantity" style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center', width:'50px'}}><span>{
          orderLineItemCount(props.line_item,props.index,props.customAttributes)}</span></span>
          <button className="Line-item__Complete" onClick={() => incrementCount(props.currentcheckoutid, props.line_item.id, props.index)} style={{height:'100%', width:'50px'}}>完成</button>
        </div>
        <button id={"provide_"+props.index} className={props.customAttributes===props.line_item.quantity?classes.show:classes.hidd}
          // onClick={updateQuantityInCart(props.line_item.id, "*")}
          onClick={() => updateQuantity(props.currentcheckoutid, props.line_item.id, props.index)}
          style={{height:40}}
        >提供済み</button>
      </div> */}
      <div className="Line-item__content-row" style={{width:'100%'}}>
        <div className="Line-item__quantity-container" style={{height:40, marginRight:'10px'}}>
          <button className="Line-item__quantity-update" style={{height:'100%', width:'50px'}} >-</button>
          <span className="Line-item__quantity" style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center', width:'50px'}}><span>{
          orderLineItemCount(props.line_item,props.index,props.customAttributes)}</span></span>
          <button className="Line-item__Complete" onClick={() => incrementCount(props.currentcheckoutid, props.line_item.id, props.index)} style={{height:'100%', width:'90px'}}>完成</button>
        </div>
        <button id={"provide_"+props.index} className={props.customAttributes===props.line_item.quantity?classes.show:classes.hidd}
          // onClick={updateQuantityInCart(props.line_item.id, "*")}
          onClick={() => updateQuantity(props.currentcheckoutid, props.line_item.id, props.index)}
          style={{height:40}}
        >提供済み</button>
      </div>
    </div>
  </li>
  );
}

export default LineItemSeat;
