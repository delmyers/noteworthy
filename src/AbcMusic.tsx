import React, { useEffect, useRef } from "react";
import Music from "./Music";
import abcjs from "abcjs";

const AbcMusicViewer: React.FC = () => {
    const abcRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const m: Music = Music.Instance;
        if (abcRef.current && m ) {
            abcjs.renderAbc(abcRef.current, m.abc);
        }
    }, []);

    return (<div ref={abcRef} />);
};

export default AbcMusicViewer;