import React, { useEffect, useRef, useState } from "react";

const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const NUMERIC = "0123456789";
const SYMBOLS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function App() {
  const textRef = useRef();
  const [length, setLength] = useState(8);
  const [isCheckNum, setIsCheckNum] = useState(false);
  const [isCheckSym, setIsCheckSym] = useState(false);
  const [password, setPassword] = useState("password");

  const copyCodeToClipboard = () => {
    let copyText = textRef.current.value;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const handleNums = (e) => {
    setIsCheckNum(e.target.checked);
  };

  const handleSymbols = (e) => {
    setIsCheckSym(e.target.checked);
  };

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const randomPassword = (length) => {
    let charset = ALPHA;
    if (isCheckNum && isCheckSym) {
      charset += NUMERIC + SYMBOLS;
    } else if (isCheckNum) {
      charset += NUMERIC;
    } else if (isCheckSym) {
      charset += SYMBOLS;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(pass);
  };

  useEffect(() => {
    randomPassword(length);
  }, [length, isCheckNum, isCheckSym]);

  return (
    <div>
      <h1>Password Generator</h1>
      <input type="text" value={password} readOnly ref={textRef} />
      <button onClick={copyCodeToClipboard}>Copy</button>
      <label>
        <input type="checkbox" onChange={handleNums} />
        Numbers
      </label>
      <label>
        <input type="checkbox" onChange={handleSymbols} />
        Symbols
      </label>
      <p>Length: {length}</p>
      <input
        type="range"
        min={8}
        max={20}
        value={length}
        onChange={handleLength}
      />
    </div>
  );
}

export default App;
