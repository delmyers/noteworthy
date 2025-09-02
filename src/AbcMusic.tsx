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
                oneSvgPerLine: true,
                lineBreaks: [1000], // effectively disable line breaks
            };
            abcRef.current.id = 'paper';
            abcjs.renderAbc(abcRef.current, m.abc, params);
        }
    }, []);

    return (<div ref={abcRef} />);
};

export default AbcMusicViewer;