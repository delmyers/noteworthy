import React, { useState, useEffect, useRef } from 'react';
import abcjs from 'abcjs';

const App: React.FC = () => {
  const [notation, setNotation] = useState(
    "X:1\nT:Cooley's\nM:4/4\nL:1/8\nK:Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\nEBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|"
  );
  const paperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperEl.current) {
      abcjs.renderAbc(paperEl.current, notation, {});
    }
  }, [notation]);

  const handleNotationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotation(event.target.value);
  };

  return (
    <div>
      <textarea
        style={{ width: '100%', height: '200px' }}
        value={notation}
        onChange={handleNotationChange}
      />
      <div ref={paperEl} />
    </div>
  );
};

export default App;
