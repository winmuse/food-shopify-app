import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Client from 'shopify-buy';
import '../shared/app.css';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebaseAction from '../firebaseAction';
import { connect } from 'react-redux';
import {language} from '../language';
import LineItem from '../components/LineItemSeat';
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
  show:{
    display:'initial'
  },
  hidd:{
    display:'none'
  }
}));

function App(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const history = useHistory();
  const [currentcheckout, setCurrentCheckout] = useState([]);
  const [line_items, setLine_items] = useState([]);
  const [seat_title, setSeat_title] = useState([]);
  const [checkoutid, setCheckoutID] = useState(false);
  const [seatnum,setSeatnum]=useState([]);
  const [seatflag,setSeatflag]=useState(true);

//  var currentcheckoutid = "";

  const init = () => {
    handleClose();
  }
  const init_data = () => {
    handleToggle();
    firebaseAction.get(res => {
      let seats = [];
      res.forEach(element => {
        let item = element.val();
        seats.push({key:element.key, seat:item.seat, text:item.text, email:item.email, checkoutId:item.checkoutId, flag:item.flag});
      });
      SetSeat(seatArray => seats);
      var lines=[];
      var titles=[];
      seats.map((seat,index)=>
      {
        var order_lines=[];
        var title="";
        client.checkout.fetch(seat.checkoutId).then((res) => {

          title="seat"+(index+1)+" ("+res.createdAt.replace("T"," ").replace("Z","")+")";

          setSeat_title(titles);
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
            if(map["order"].value.includes("1/"))
            {
              line1.push(
                <LineItem
                  line_item={res.lineItems[subindex]}
                  updateQuantityInCart={updateQuantityInCart}
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
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
                  customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
                  index={subindex}
                  currentcheckoutid={res.id}
                  order={10}
                />
              );
            }
            // line.push(
            //   <LineItem
            //     line_item={res.lineItems[subindex]}
            //     updateQuantityInCart={updateQuantityInCart}
            //     customAttributes={(res.lineItems[subindex].customAttributes).length===0?0:parseInt(res.lineItems[subindex].customAttributes[0].value)}
            //     index={subindex}
            //     currentcheckoutid={res.id}
            //   />
            // );
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
          //  order_lines.push("");
          // line[2] = res.lineItems.map((line_item,subindex) => {
          //   return (
          //     <LineItem
          //       line_item={line_item}
          //       updateQuantityInCart={updateQuantityInCart}
          //       customAttributes={(line_item.customAttributes).length===0?0:parseInt(line_item.customAttributes[0].value)}
          //       index={subindex}
          //       currentcheckoutid={res.id}
          //     />
          //   );
          // });
          // line[1] = res.lineItems.map((line_item,subindex) => {
          //   return (
          //     <LineItem
          //       line_item={line_item}
          //       updateQuantityInCart={updateQuantityInCart}
          //       customAttributes={(line_item.customAttributes).length===0?0:parseInt(line_item.customAttributes[0].value)}
          //       index={subindex}
          //       currentcheckoutid={res.id}
          //     />
          //   );
          // });

          if(order_lines.length>0){
            lines[index] = (order_lines);
            titles[index] = (title);
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

    // client.checkout.updateLineItems(currentcheckoutid, lineItemsToUpdate).then(res => {
    //   let line = res.lineItems.map((line_item,index) => {
    //     return (
    //       <LineItem
    //         line_item={line_item}
    //         // customAttributes={(line_item.customAttributes).length===0?0:parseInt(line_item.customAttributes[0].value)}
    //         //customAttributes={(line_item.customAttributes).length===0?0:parseInt(line_item.customAttributes[0].value)}
    //         updateQuantityInCart={updateQuantityInCart}
    //         index={index}
    //       />
    //     );
    //   });
    //   setLine_items(line);
    //   setCurrentCheckout(res);
    // });

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
    init_data();
    
    setTimeout(function () {
      init();
    }, 1500)
  }, []);

  function txtChange(index){
    firebaseAction.update(seatArray[index].key, seatArray[index].text);
  }
  async function OnChangeCheck(index){
    await firebaseAction.updateFalg(seatArray[index].key, seatArray[index].flag);
  }

  const [flag,setFlag]=React.useState(true)
  const handleChange=(e)=>{
    seatArray[e.target.name].text = e.target.value;
    SetSeat(seatArray);
    setFlag(!flag);
    txtChange(e.target.name);
  }

  // const handleChangeseat=(e)=>{
  //   var selBtnVal=document.getElementById('selBtnVal').value;
  //   if(selBtnVal!==e.target.id){
  //     if(selBtnVal!==""){
  //       document.getElementById(selBtnVal).style.border = "solid 3px #fff";
  //       document.getElementById(selBtnVal).style.color = "#fff";
  //     }

  //     document.getElementById(e.target.id).style.border = "solid 3px #f7a0a5";
  //     document.getElementById(e.target.id).style.color = "#f7a0a5";
  //     document.getElementById('selBtnVal').value=e.target.id;
  //   }
  //   setSeatflag(e.target.value);
  //   setCheckoutID(e.target.id);

  //   currentcheckoutid = e.target.id;
  //   client.checkout.fetch(e.target.id).then((res) => {
  //     setCurrentCheckout(res);

  //     let line = res.lineItems.map((line_item,index) => {
  //       return (
  //         <LineItem
  //           line_item={line_item}
  //           updateQuantityInCart={updateQuantityInCart}
  //           customAttributes={(line_item.customAttributes).length===0?0:parseInt(line_item.customAttributes[0].value)}
  //           index={index}
  //         />
  //       );
  //     });
  //     setLine_items(line);
  //   })
  //   .catch((error)=>{
  //     setLine_items('line');
  //   });
  // }

  return (

    <div style={{height:'100vh', overflow:'auto', width:'100vw',
      backgroundColor: '#1d2225', display: 'flex', justifyContent: 'space-between', flexWrap:'wrap'}}>

      <div style={{width:'calc(100% - 27px)', height:'100%'}}>

        <div style={{height:'70px', width:'100%'}}>
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

        <div style={{ padding: '20px', width: '100%', height:'calc(100% - 120px)'}}>

          <div style={{width:'100%',display:'flex', flexWrap:'wrap', height:'100%'}}>

            {/* <div style={{ height: '100%', width:'50%', overflow: 'auto', justifyContent: 'space-around' , borderRight:'1px solid #9ba8b7' }}>
              {
                seatArray.map((val, index) => {
                  return (
                    <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 16, fontWeight: 'bold', display:'flex', justifyContent:'center', 
                    width:'100%' }} key={index}>

                      <div value={val.flag} id={val.checkoutId===""?index:val.checkoutId} variant="contained" style={{cursor:'pointer', border: '1px solid #fff', backgroundColor: '#1d2225',
                      color: '#fff', display:'flex', margin:3, justifyContent:'center',alignItems:'center', fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold', padding: 1, height: 50, minWidth: '30vw', borderRadius: 10 }}
                        onClick={handleChangeseat}
                        key={index+1}
                      >
                        <div id={val.checkoutId===""?index:val.checkoutId} >座席 {index+1}</div>
                      </div>

                    </div>
                  );
                })
              }
            </div> */}
            <div style={{height:'100%',width:'100%', overflow:'auto', paddingLeft:'10px', display:'flex', flexWrap: 'wrap'}}>
              {/* <div style={{height:'100%',width:'400px', overflow:'auto', margin:'auto', marginTop:'10px', borderRadius:'5%'}}>
                <div style={{height:'100%',width:'100%', backgroundColor:'#ffff00'}} onClick={()=>{
                  {
                    line_items.map((val,index)=>(
                      <div style={{width:'400px', overflow:'auto', margin:'auto', marginTop:'10px'}}>
                        <div style={{height:'100%',width:'100%', backgroundColor:'#223333', borderRadius:'5%'}}>
                          <h2 style={{textAlign:'center',fontFamily:'auto',padding:'5px',color:'#ff7f50'}}>{seat_title}</h2>
                          {val}
                        </div>
                      </div>
                    ))
                  }
                }}>
                  line_items
                </div>
              </div> */}
              {
                line_items.map((val,index)=>(

                  <div style={{width:'400px', overflow:'', margin:'auto', marginTop:'10px'}}>
                    <div style={{height:'100%',width:'100%', backgroundColor:'#223333', borderRadius:'5%'}}>
                      <h2 style={{textAlign:'center',fontFamily:'auto',padding:'5px',color:'#ff7f50'}}>{seatnum[index]}</h2>
                      {
                      /* {
                        val.map((sval,sindex)=>(
                          <ul style={{overflow:'auto',margin:'auto', padding:'15px 15px 15px 15px'}} className={sval.length!==0?classes.show:classes.hidd}>
                            {sval}
                          </ul>
                        ))
                      } */}
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
              <div>
                <img src="./assets/menu.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} onClick={()=>{history.push('/products')}} />
              </div>
              <div>
                <img src="./assets/seat.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} />
              </div>
              <div>
                <img src="./assets/printer.png" alt="alt" style={{cursor:'pointer', width:'45px', height:'45px'}} />
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
    lang_index: state.authen
  };
}
export default connect(mapStateToProps)(App);
