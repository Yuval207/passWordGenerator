import React, { useRef, useState } from "react";

function App() {
  const divRef = useRef();
  const [length, setLength] = useState(8);
  const handleLength = (e) => {
    setLength(e.target.value);
  };
  return (
    <div>
      <h1>Password Generator</h1>
      <input type="text" />
      <button>Copy</button>
      <label>
        <input type="checkbox" />
        Numbers
      </label>
      <label>
        <input type="checkbox" />
        Symbols
      </label>
      <p>Length : {length}</p>
      <input type="range" min={8} max={20} onChange={handleLength} />
    </div>
  );
}

export default App;
