import firebase from 'firebase';
import {firebaseConfig} from "./config/firebaseConfig";
import { useCallback } from 'react';

class firebaseClass {
    constructor(props) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }
    pushData(array){
        this.ref("seat").push(array);
    }
    pushSettingData(array){
        this.ref("setting").push(array);
    }
    async delete(key){
        await this.ref(`seat`).child(key).remove();
    }
    async deleteSetting(key){
        await this.ref(`setting`).child(key).remove();
    }

    get(callback){
        this.ref("seat").on("value", res => {
            callback(res);
        })
    }
    getSetting(callback){
        this.ref("setting").on("value", res => {
            callback(res);
        })
    }
    ref(db){
        return firebase.database().ref(db);
    }
    //update(values: { [key: string]: value }, onComplete?: Function): Promise<void>;
    updateSeat(key, val){
        this.ref(`seat`).child(key).update({"seat" : val});
    }
    update(key, val){
        this.ref(`seat`).child(key).update({"text" : val});
    }
    updateFalg(key, val){
        this.ref(`seat`).child(key).update({"flag" : val});
    }
    updateCheckoutID(key, val){
        this.ref(`seat`).child(key).update({"checkoutId" : val});
    }
    updateSettingValue(key, val){
        this.ref(`setting`).child(key).update({"value" : val});
    }
    updateSettingPassword(key, val){
        this.ref(`setting`).child(key).update({"password" : val});
    }
    updateSettingLogoImg(key, val){
        this.ref(`setting`).child(key).update({"img" : val});
    }
    updateSettingLanguage(key, val){
        this.ref(`setting`).child(key).update({"language" : val});
    }
}
const firebaseAction = new firebaseClass();
export default firebaseAction;