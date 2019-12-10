import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [terminal, setTerminal] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "terminal") {
      setTerminal(value)
    }
  }

  return (
    <main className="frame">
      <header>
        <h1 className="heading">**** Commodore 64 ****</h1>
        <h1 className="heading">64K ram system 38911 basic bytes free</h1>
      </header>
      {/* <span class="heading heading_span">Ready .</span> */}
      <div id="terminal-container">
        <textarea type="text" id="terminal" name="terminal" onChange={(e) => handleChange(e)} autoFocus/>
      </div>
    </main>
  );
}

export default App;
