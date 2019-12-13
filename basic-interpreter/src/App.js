import React, { useState } from 'react';
import useTerminalEvents from './hooks/useTerminalEvents';
import useBeep from './hooks/useBeep';
import './App.css';
import './crt.css';

const App = () => {
  const [terminalText, setTerminalText] = useState('');
  //const [beepNow] = useBeep('../public/blip.aiff');
  const [handleTerminalChange, handleTerminalKeyPress] = useTerminalEvents(terminalText, setTerminalText /*, beepNow */);

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
