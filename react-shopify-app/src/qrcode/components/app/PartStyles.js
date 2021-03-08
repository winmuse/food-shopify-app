import React, {useEffect, useState} from 'react';
import './App.css';
import StyleListViewer from "../../containers/style/StyleListViewer";
import {isPC} from "../../utils/navigatorUtils";
import ScrollContainer from 'react-indiana-drag-scroll'
import {handleScroll} from "../../utils/gaHelper";

const PartStyles = ({ setParamInfo }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    const styleList = React.createElement(StyleListViewer({setParamInfo}))

    return (<div className="Qr-titled" id="Qr-style">
        <ScrollContainer
            className="Qr-s"
            onStartScroll={(e) => handleScroll('style')}
            hideScrollbars={false}
            horizontal={true}
            vertical={false}
            style={{visibility: loaded ? "visible" :"hidden"}}>
            {styleList}
        </ScrollContainer>
    </div>)
}

export default PartStyles;
