import React, { useEffect } from 'react';
import Product from './Product';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import {language} from '../language';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SettingsIcon from '@material-ui/icons/Settings';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import MenuItem from '@material-ui/core/MenuItem';

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
}));

function Products(props) {
  var lang_index = props.lang_index;
  //lang_index = 1;
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [seatchflag,setSearchflag]=React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    handleToggle();
    setTimeout(function () {
      handleClose();
    }, 1500)
  }, []);

  let products = props.products.map((product) => {
    return (
      <Product
        addVariantToCart={props.addVariantToCart}
        client={props.client}
        key={product.id.toString()}
        product={product}
      />
    );
  });

  return (
    <div style={{ textAlign: 'center', width: '100%', height: '100vh', margin: 'auto', backgroundColor: '#1d2225', justifyContent: 'space-between', display: 'flex' }}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ width: '100%', padding: '30px 25px' }}>
        <div style={{height:'10vh',marginBottom:'2vh'}}>
          <div style={{height:'70%',display:'flex',flexWrap:'wrap',justifyContent:'space-between',color:'#fff',alignItems:'center' }}>
            {/* <img src="./assets/seat_logo.png" alt="seat_logo" style={{height:'100%'}} onClick={() => { history.push('/') }} /> */}
            <AddIcon style={{cursor:'pointer'}} />
            <SettingsIcon style={{cursor:'pointer'}} />
            <FormControl className={classes.formControl}>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={10}
                  // onChange={handleChange}
                  style={{color:'#fff',fontSize:16}}
              >
              <MenuItem value={10}>座席選択</MenuItem>
              <MenuItem value={11}>座席選択1</MenuItem>
              </Select>
            </FormControl>
            <BlurOnIcon style={{cursor:'pointer'}} onClick={()=>{alert('asdfasdf')}} />
            <SearchIcon style={{cursor:'pointer'}} onClick={()=>{setSearchflag(!seatchflag)}} />
          </div>
          <div style={{ cursor: 'pointer', width: '100%', textAlign: 'center', backgroundImage: 'url(./assets/point.png)', backgroundRepeat: 'repeat-x', marginTop: '1vh',height:'10%' }}>
            <div style={{ width: '100%', color: '#1d2225' }}>a</div>
          </div>
        </div>
        <Paper component="form" className={seatchflag?classes.show:classes.hid}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder={language[lang_index].product_search}
                inputProps={{ 'aria-label': 'search google maps' }}
                fullWidth
                onChange={props.onPressedSearch}
            />
        </Paper>
        <div style={{ width: '100%', height: '57vh', overflow: 'auto', paddingRight: 15, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around',marginTop:30 }}>
          {products}
        </div>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around',position:'absolute',top:'92vh',left:'auto',width:'85vw'}}>
              <div>
                <img src="./assets/menu.png" alt="alt" style={{cursor:'pointer'}} onClick={()=>{history.push('/seat')}} />
              </div>
              <div>
                <img src="./assets/seat.png" alt="alt" style={{cursor:'pointer'}} onClick={() => props.addVariantToCart(0,0,flag)} />
              </div>
              <div>
                <img src="./assets/printer.png" alt="alt" style={{cursor:'pointer'}} />
              </div>
          </div>
      </div>
      <div style={{ width: '27px', backgroundImage: 'url(./assets/logo_ban.png)', backgroundRepeat: 'repeat-y' }}></div>
    </div>
  );
  // }
}
function mapStateToProps(state) {
  return {
    lang_index: state.authen
  };
}
export default connect(mapStateToProps)(Products);
