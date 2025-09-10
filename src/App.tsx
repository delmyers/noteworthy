import React from 'react';
import Music from './Music';
import SlateEditor from './SlateEditor';
import AbcMusicViewer from './AbcMusic';

const App: React.FC = () => {
  Music.Instance; // Ensure the singleton is initialized
  return (
    <div id="musicroot" style={({width: '1000000px', height: '100%', overflow: 'auto hidden'})}>
      <AbcMusicViewer />
    </div>
  );
};

export default App;
