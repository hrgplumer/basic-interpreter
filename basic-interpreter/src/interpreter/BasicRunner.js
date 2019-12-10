import Basic from './basic';

const BasicRunner = (terminalInput, printFunction) => {
    if (terminalInput.length <= 0)
        return;

    const [Parser, Interpreter] = Basic;
    
    try {
        const parser = new Parser(terminalInput);
        parser.parse();

        const interpreter = new Interpreter();
        interpreter.setParser(parser);
        interpreter.print_function = printFunction;
        interpreter.interpret();
        
    } catch (error) {
        alert(error);
        return false;
    }
}

export default BasicRunner;