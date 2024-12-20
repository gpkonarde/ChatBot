import React from 'react';
import {RecoilRoot} from 'recoil';
import ChatbotApp from './View';

const App = () => {
  return (
    <RecoilRoot>
      <ChatbotApp />
    </RecoilRoot>
  );
};

export default App;