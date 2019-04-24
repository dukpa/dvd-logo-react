import React from 'react';
import './App.css';
import '../DVD_logo.svg'

const App = (props) => (
  <div id="App">
    <div id="Logo" style={{
      left: props.left,
      top: props.top
    }}></div>
  </div>
)

export default App;
