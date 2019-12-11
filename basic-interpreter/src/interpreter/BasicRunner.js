import Basic from './basic';

const BasicRunner = (terminalInput, printFunction) => {
    if (terminalInput.length <= 0)
        return null;

    const [Parser, Interpreter] = Basic;
    
    try {
        console.log(`basic runner receives: ${terminalInput}`);
        const parser = new Parser(terminalInput);
        console.log({terminalInput});
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