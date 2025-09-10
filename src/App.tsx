import React from 'react';
import Music from './Music';
import SlateEditor from './SlateEditor';
import AbcMusicViewer from './AbcMusic';
import BottomFlyout from './BottomFlyout';

const App: React.FC = () => {
  Music.Instance; // Ensure the singleton is initialized
  return (
    <div id="musicroot" style={({width: '100000px', height: '100%', overflow: 'auto hidden'})}>
      <AbcMusicViewer />
      <BottomFlyout />
    </div>
          
  );
};

export default App;
