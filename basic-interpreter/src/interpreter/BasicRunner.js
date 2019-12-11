import Basic from './basic';

const BasicRunner = (terminalInput, printFunction) => {
    if (terminalInput.length <= 0)
        return null;

    const [Parser, Interpreter] = Basic;
    
    try {
        const parser = new Parser(terminalInput);
        parser.parse();

        const interpreter = new Interpreter();
        interpreter.setParser(parser);
        interpreter.print_function = printFunction;
        interpreter.interpret();
        return interpreter;
    } catch (error) {
        console.trace(error);
        return null;
    }
}

// Add stop, start methods using basic.js props

export default BasicRunner;