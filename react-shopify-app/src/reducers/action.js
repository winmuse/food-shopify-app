import * as actionTypes from './constants';

export function ChangeAuthen(val) {
  return { type: actionTypes.CHANGEAUTHEN, authen1: val };
}

export function ChangeSeatkey(val) {
  return { type: actionTypes.CHANGESEATKEY, seatkey1: val };
}

export function ChangeQrUrl(val) {
  return { type: actionTypes.CHANGEQRURL, qrurl1: val };
}

export function ChangeLicense(val) {
  return { type: actionTypes.CHANGELICENSE, license1: val };
}
