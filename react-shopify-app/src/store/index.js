import { createStore } from 'redux';
import Public from './../reducers/public';
import rootReducer from '../qrcode/reducers';
const store = createStore(
    rootReducer
);
export default store;