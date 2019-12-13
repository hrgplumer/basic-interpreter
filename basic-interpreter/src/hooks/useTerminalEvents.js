import BasicRunner from '../interpreter/BasicRunner';

const useTerminalEvents = (terminalText, setTerminalTextFunction) => {
    const handleTerminalChange = (event) => {
        const { name, value } = event.target;
        if (name === "terminal") {
            setTerminalTextFunction(value);
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
                    textToRun = i === inputLines.length - 1 ? inputLines[i] + textToRun : inputLines[i] + '\n' + textToRun;
                }

                const basic = BasicRunner(textToRun, (text, endOfLine) => {
                    setTerminalTextFunction(prev => {
                        const newText = `${prev}\n${text}${endOfLine ? '\n' : ''}`
                        return newText;
                    });
                });

                // Append "READY." to terminal after execution
                setTerminalTextFunction(prev => prev + 'READY.');
            }
            else if (last.toLowerCase() === 'clear') {
                setTerminalTextFunction('');
            }
        }
    }

    return [handleTerminalChange, handleTerminalKeyPress];
}

export default useTerminalEvents;