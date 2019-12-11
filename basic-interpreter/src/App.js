import React, { useState } from 'react';
import BasicRunner from './interpreter/BasicRunner';
import './App.css';
import './crt.css';

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
        /* Run basic */

        // Find text since last "ready" and only run that
        let textToRun = '';
        for (let i = inputLines.length - 1; i >= 0; i--) {
          if (inputLines[i].match(/READY/g)) {
            break;
          }
          
          // Ensure textToRun has no trailing \n, because this will cause errors in parsing
          textToRun = i === inputLines.length - 1? inputLines[i] + textToRun : inputLines[i] + '\n' + textToRun;
        }

        const basic = BasicRunner(textToRun, (text, endOfLine) => {
          setTerminalText(prev => {
            const newText = `${prev}\n${text}${endOfLine ? '\n' : ''}`
            return newText;
          });
        });

        // Append "READY." to terminal after execution
        setTerminalText(prev => prev + 'READY.');
      }
      else if (last.toLowerCase() === 'clear') {
        setTerminalText('');
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
      <div className="overlay">AV-1</div>
    </main>
  );
}

export default App;
