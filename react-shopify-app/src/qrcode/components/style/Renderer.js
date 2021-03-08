import React, {useCallback,useEffect} from "react";
import {extend} from "../../utils/util";
//import Config from '../config/config.js';
import Config from '../../../config/config.js';
import {language} from '../../../language';
// import Modal from 'react-modal';
// import PartDownloadViewer from "../../containers/app/PartDownloadViewer";
// import {getDownloadCount, login} from "../../api/TcbHandler";
// import {loadDownloadData} from "../../actions";

// const customStyles = {
//     content : {
//       top                   : '50%',
//       left                  : '50%',
//       right                 : 'auto',
//       bottom                : 'auto',
//       marginRight           : '-50%',
//       transform             : 'translate(-50%, -50%)'
//     }
//   };

const Renderer = ({ rendererType, ...other }) => (
    React.createElement(rendererType, other)
)

function areEqual(prevProps, nextProps) {
    return !(prevProps.selected === true || nextProps.selected === true)
}

export function createRenderer(renderer) {
    let defaultViewBox = function (qrcode) {
        if (!qrcode) return '0 0 0 0';

        const nCount = qrcode.getModuleCount();
        return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
    }

    renderer = extend({
        getViewBox: defaultViewBox,
        listPoints: (qrcode, params) => { return []; },
        getParamInfo: () => {return []; },
        beginRendering: ({ qrcode, params, setParamInfo }) => {},
        beforeListing: ({ qrcode, params, setParamInfo }) => {},
        afterListing: ({ qrcode, params, setParamInfo }) => {},
    }, renderer);

    return ({ qrcode, params, setParamInfo}) => {
        useEffect(() => {
            setParamInfo(renderer.getParamInfo());
        }, [setParamInfo]);

        const printing=()=>{
            //if((global.price_list==='premium') || (global.price_list==='unlimit'))
            {
                var content = document.getElementById("qr_img");
                var pri = document.getElementById("ifmcontentstoprint").contentWindow;
                document.getElementById("ifmcontentstoprint").setAttribute("class", "QrframeMax");
                pri.document.open();
                pri.document.write(content.innerHTML);
                pri.document.close();
                pri.focus();
                pri.print();
                document.getElementById("ifmcontentstoprint").setAttribute("class", "QrframeMin");
            }
            // else
            //     alert(language[1].seat_price_alert);
        }
        return (
            <div>
                <iframe id="ifmcontentstoprint" style={{height: 0, width: 0, position: 'absolute'}}></iframe>
                <div id="qr_img">
                    <svg className="Qr-item-svg" width="100%" height="100%" viewBox={renderer.getViewBox(qrcode)} fill="white"
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        onClick={printing}
                        >
                        {renderer.beforeListing({ qrcode, params, setParamInfo })}
                        {renderer.listPoints(qrcode, params)}
                        {renderer.afterListing({ qrcode, params, setParamInfo })}
                    </svg>
                </div>
            </div>
        );
    }
}

export default React.memo(Renderer, areEqual)
