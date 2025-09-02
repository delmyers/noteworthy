import React, { useEffect, useRef } from 'react';
import abcjs from 'abcjs';
var App = function () {
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
         React.createElement("div", { ref: paperEl })));
};
export default App;
