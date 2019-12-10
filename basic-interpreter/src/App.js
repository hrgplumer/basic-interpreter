import React, { useState } from 'react';
import BasicRunner from './interpreter/BasicRunner';
import './App.css';

const App = () => {
  const [terminalText, setTerminalText] = useState('');

  const handleTerminalChange = (event) => {
    const { name, value } = event.target;
    if (name === "terminal") {
      setTerminalText(value);
    }
  }

  const handleTerminalKeyPress = (event) => {
    const { charCode } = event;
    if (charCode === 13) { // enter key
      // get last line of terminal
      const inputLines = terminalText.split('\n');
      const last = inputLines.length > 0 ? inputLines[inputLines.length - 1] : '';

      if (last.toLowerCase() === 'run') {
        // run basic
        const basic = BasicRunner(terminalText, (text, endOfLine) => {
          setTerminalText(prev => {
            const newText = `${prev}\n ${text.trim()}${endOfLine ? '\n' : ''}`
            return newText;
          });
        });
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
          value={terminalText}
          autoFocus
          onChange={(e) => handleTerminalChange(e)}
          onKeyPress={(e) => handleTerminalKeyPress(e)}
        />
      </div>
    </main>
  );
}

export default App;
