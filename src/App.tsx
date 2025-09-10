import React from 'react';
import Music from './Music';
import SlateEditor from './SlateEditor';
import AbcMusicViewer from './AbcMusic';
import BottomFlyout from './BottomFlyout';

const App: React.FC = () => {
  Music.Instance; // Ensure the singleton is initialized
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{ display: 'flex', overflow: 'auto', padding: '0px' }}>
        <AbcMusicViewer />
      </div>
      <div>
        <BottomFlyout />
      </div>
    </div>
        
  );
};

export default App;
