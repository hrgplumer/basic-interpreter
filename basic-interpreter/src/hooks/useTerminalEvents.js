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
                let textToRun = '';
                for (let i = inputLines.length - 1; i >= 0; i--) {
                    // Find text since last "ready" and only run that
                    if (inputLines[i].match(/READY/g)) {
                        break;
                    }

                    // Strip RUN out of text we send to the parser
                    if (inputLines[i].match(/RUN/g)) {
                        continue;
                    }

                    // Ensure textToRun has no trailing \n, because this will cause errors in parsing
                    textToRun = i === inputLines.length - 1 ?
                        inputLines[i] + textToRun :
                        inputLines[i] + '\n' + textToRun;
                }

                const basic = BasicRunner(textToRun.trim(),
                    (text, endOfLine) => { // print function
                        setTerminalTextFunction(prev => {
                            const newText = `${prev}\n${text}${endOfLine ? '\n' : ''}`
                            return newText;
                        })
                    },
                    () => { // string input function
                        const input = prompt('Enter input:');
                        return input;
                    },
                    () => { // numeric input function
                        const number = prompt('Enter a number:');
                        return parseFloat(number);
                    }
                );

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