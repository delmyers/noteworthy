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
                staffwidth: 10000,
                wrap: { preferredMeasuresPerLine: 1000, minSpacing: 1.5, maxSpacing: 1.5 },
                oneSvgPerLine: true,

            };
            abcjs.renderAbc('paper', m.abc, params);
        }
    }, []);

    return (
        <div style={{height:'98vh', overflow:'auto'}}>
            <div style={{width:'10000px'}}>
                <div id='paper' ref={abcRef}/>
            </div>
        </div>
);
};


export default AbcMusicViewer;