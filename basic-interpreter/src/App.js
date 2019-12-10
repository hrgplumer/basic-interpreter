import React, { useState } from 'react';
import BasicRunner from './interpreter/BasicRunner';
import './App.css';

const App = () => {
  const [terminal, setTerminal] = useState('ready.\n');

  const handleTerminalChange = (event) => {
    const { name, value } = event.target;
    if (name === "terminal") {
      setTerminal(value);
    }
  }

  const handleTerminalKeyPress = (event) => {
    const {charCode} = event;
    if (charCode === 13) { // enter key
      // get last line of terminal
      const inputLines = terminal.split('\n');
      const last = inputLines.length > 0? inputLines[inputLines.length - 1] : '';
      
      if (last.toLowerCase() === 'run') {
        // run basic
      }
    }
  }

  return (
    <main className="frame">
      <header>
        <h1 className="heading">**** Commodore 64 ****</h1>
        <h1 className="heading">64K ram system 38911 basic bytes free</h1>
      </header>
      <div id="terminal-container">
        <textarea
          spellCheck="false"
          type="text"
          id="terminal"
          name="terminal"
          value={terminal}
          autoFocus
          onChange={(e) => handleTerminalChange(e)}
          onKeyPress={(e) => handleTerminalKeyPress(e)}
           />
      </div>
    </main>
  );
}

export default App;
