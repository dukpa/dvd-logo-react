import React from 'react';
import './App.css';
import DvdLogo from './DvdLogo';

const App = (props) => (
  <div id="App">
    <div id="Logo" style={{
      left: props.left,
      top: props.top
    }}>
      <DvdLogo />
    </div>
  </div>
)

export default App;
