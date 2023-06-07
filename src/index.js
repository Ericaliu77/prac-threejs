import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebGPUTest from './WebGPU/WebGPUTest'
import Scene from './Scene/index.tsx'

ReactDOM.render(
  <React.StrictMode>
    <WebGPUTest />
{/* <TextGojs/> */}
    {/* <GisThree></GisThree> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
