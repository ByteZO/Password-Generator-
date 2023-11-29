import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [lenght, setlenght] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [character, setcharacter] = useState(false);
  const passRef = useRef(null);

  const passGen = useCallback(() => {
    let wordList = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
    let pass = "";

    if (numbers) wordList += "0123456789";
    if (character) wordList += "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~";

    for (let i = 1; i <= lenght; i++) {
      let charIn = Math.random() * wordList.length + 1;
      pass += wordList.charAt(charIn);

      console.log(pass);
    }
    setPassword(pass);
  }, [lenght, numbers, character, setPassword]);

  useEffect(() => {
    passGen();
  }, [lenght, numbers, character, passGen]);

  const passClip = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="home">
        <div className="genBox">
          Password Generator
          <div className="insec">
            <input
              className="Iput"
              type="text"
              value={password}
              readOnly
              placeholder="Password"
            />

            <button className="copy" onClick={passClip}>
              copy
            </button>
          </div>
          <div className="toggles">
            <input
              className="range"
              type="range"
              name=""
              id="range"
              min={8}
              max={100}
              value={lenght}
              onChange={(e) => {
                setlenght(e.target.value);
              }}
              ref={passRef}
            />
            <label>length: {lenght} </label>

            <input
              type="checkbox"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label>Numbers </label>

            <input
              type="checkbox"
              onChange={() => {
                setcharacter((prev) => !prev);
              }}
            />
            <label>Characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
