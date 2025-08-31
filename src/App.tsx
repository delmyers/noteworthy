import React from 'react';
import Music from './Music';
import SlateEditor from './SlateEditor';
import AbcMusicViewer from './AbcMusic';

const App: React.FC = () => {
  Music.Instance; // Ensure the singleton is initialized
  return (
    <div>
      <SlateEditor />
      <AbcMusicViewer />
    </div>
  );
};

export default App;
