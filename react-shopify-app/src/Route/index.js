import React from 'react'
import { Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { withStyles } from '@material-ui/core/styles';
import Main from '../pages/index';
import Register from '../pages/register';
import Advert from '../pages/advert';
import Seat from '../pages/seat';
import Products from '../pages/products';
import Checkout from '../pages/checkout';
import checkout_confirm from '../pages/checkout_confirm';
const hist = createBrowserHistory();
const styles = theme => ({
    root: {
        color: theme.palette.textOnPrimary,
        minHeight: '100vh'
    }
})

const GuestLayout = ({ classes }) => {
    return (
        <div className={classes.root}>
            <div>
                <Router history={hist}>
                    <Switch>
                        <Route path='/' exact component={Main} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/advert' exact component={Advert} />
                        <Route path='/seat' exact component={Seat} />
                        <Route path='/products/:id' exact component={Products} />
                        <Route path='/checkout' exact component={Checkout} />
                        <Route path='/checkout_confirm' exact component={checkout_confirm} />
                        <Redirect to='/' />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default withStyles(styles)(GuestLayout)
