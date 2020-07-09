import React from 'react';
import './App.css';

/**
 * @return {null}
 */

function App() {
  // const video = document.querySelector("video");

  const handlePlay = (ele) => {
    // ele.play();
    console.log("ele",ele);
  }
  
  return (
    <div className="App">
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("cool")
          const currentWindow = window.getCurrent();
          console.log("currentWindow",currentWindow);
          const video = document.querySelector("video");
          debugger;
          handlePlay(video);
        }}
      >Click to play</button>
    </div>
  );
}

export default App;
