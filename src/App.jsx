import React, { useEffect, useRef, useState } from "react";

const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMERIC = "0123456789";
const SYMBOLS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function App() {
  const textRef = useRef();
  const [length, setLength] = useState(8);
  const [isCheckNum, setIsCheckNum] = useState(false);
  const [isCheckSym, setIsCheckSym] = useState(false);
  const [password, setPassword] = useState("password");

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    navigator.clipboard.writeText(copyText);
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
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white w-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-4">Password Generator</h1>
        <div className="mb-4">
          <input
            type="text"
            value={password}
            readOnly
            ref={textRef}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label>
            <input type="checkbox" onChange={handleNums} />
            <span className="ml-2">Numbers</span>
          </label>
          <label className="ml-4">
            <input type="checkbox" onChange={handleSymbols} />
            <span className="ml-2">Symbols</span>
          </label>
        </div>
        <p className="mb-4">Length: {length}</p>
        <input
          type="range"
          min={8}
          max={20}
          value={length}
          onChange={handleLength}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default App;
