import React, { useEffect, useRef } from "react";
import Music from "./Music";
import abcjs from "abcjs";

const AbcMusicViewer: React.FC = () => {
    const abcRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const m: Music = Music.Instance;
        if (abcRef.current && m ) {
            const params: abcjs.AbcVisualParams = {
                add_classes: true,
                viewportHorizontal: true,
                scrollHorizontal: true,
                lineBreaks: [1000000], // effectively disable line breaks
                oneSvgPerLine: true
            };
            abcjs.renderAbc('paper', m.abc, params);
        }
    }, []);

    return (
        <div style={{height:'95vh'}}>
            <div id='paper' ref={abcRef}/>
        </div>);
};


export default AbcMusicViewer;