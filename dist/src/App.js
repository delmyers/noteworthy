import React, { useState, useEffect, useRef } from 'react';
import abcjs from 'abcjs';
var App = function () {
    var _a = useState("X:1\nT:Cooley's\nM:4/4\nL:1/8\nK:Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\nEBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|"), notation = _a[0], setNotation = _a[1];
    var paperEl = useRef(null);
    useEffect(function () {
        if (paperEl.current) {
            var parsed = abcjs.renderAbc(paperEl.current, notation, {});
        }
    }, [notation]);
    var handleNotationChange = function (event) {
        setNotation(event.target.value);
    };
    return (React.createElement("div", null,
        React.createElement("textarea", { style: { width: '100%', height: '200px' }, value: notation, onChange: handleNotationChange }),
        React.createElement("div", { ref: paperEl })));
};
export default App;
