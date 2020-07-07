import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  
  let root;
   root = document.getElementById("cine-ui");
  if (root) {
    return ReactDOM.render(
        <App />,
      root
    );
  }
  document.addEventListener("change",(e) => {
    e.stopPropagation();
    e.preventDefault();
    debugger
    root = document.getElementById("cine-ui");
    if(root){
      debugger
      ReactDOM.render(
          <App />,
        root
      );
    }
  })
  // return ReactDOM.render(
  //   <App />,
  //   root
  // );
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
