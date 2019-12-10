import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [terminal, setTerminal] = useState('ready.\n');

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "terminal") {
      setTerminal(value);
    }
  }

  return (
    <main className="frame">
      <header>
        <h1 className="heading">**** Commodore 64 ****</h1>
        <h1 className="heading">64K ram system 38911 basic bytes free</h1>
      </header>
      <div id="terminal-container">
        <textarea spellCheck="false" type="text" id="terminal" name="terminal" onChange={(e) => handleChange(e)} value={terminal} autoFocus/>
      </div>
    </main>
  );
}

export default App;
