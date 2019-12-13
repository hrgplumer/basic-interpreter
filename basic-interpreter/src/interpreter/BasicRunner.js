import Basic from './basic';

const BasicRunner = (terminalInput, printFunction, stringInputFunction, numericInputFunction) => {
    if (terminalInput.length <= 0)
        return null;

    const [Parser, Interpreter] = Basic;
    
    try {
        const parser = new Parser(terminalInput);
        parser.parse();

        const interpreter = new Interpreter();
        interpreter.setParser(parser);
        interpreter.print_function = printFunction;

        const gatherInput = (inputFunction) => {
            const input = inputFunction();
            interpreter.push_input(input);
            try {
                interpreter.resume_input();
            } catch(error) {
                console.trace(error);
            }
        }

        interpreter.string_input_function = () => gatherInput(stringInputFunction);
        interpreter.number_input_function = () => gatherInput(numericInputFunction);
        interpreter.interpret();
        return 'OK';
    } catch (error) {
        console.trace(error);
        return error;
    }
}

// Add stop, start methods using basic.js props

export default BasicRunner;