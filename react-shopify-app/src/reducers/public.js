
import * as actionTypes from './constants';
export const initialState = {
    authen: 0,
    seatkey:0,
    qrurl:'',
    license:'asd'
}

export default function (state = initialState, action) {
    switch (action.type) {
        // authen start
        case actionTypes.CHANGEAUTHEN:
            return {
                ...state,
                authen: action.authen1,
            }
            break;
        case actionTypes.CHANGESEATKEY:
            return {
                ...state,
                seatkey: action.seatkey1,
            }
            break;
        case actionTypes.CHANGEQRURL:
            return {
                ...state,
                qrurl: action.qrurl1,
            }
            break;
        case actionTypes.CHANGELICENSE:
            return {
                ...state,
                license: action.license1,
            }
            break;
        default:
            return state
    }
}