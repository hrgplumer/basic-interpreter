import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App />);
  return {
    ...utils
  };
}

afterEach(cleanup);

test('renders commodore 64 header', () => {
  const { getByText } = setup();
  const textElement = getByText(/commodore 64/i);
  expect(textElement).toBeInTheDocument();
});

test('overlay shows up', () => {
  const { getByText } = setup();
  const overlay = getByText('AV-1');
  expect(overlay).toBeInTheDocument();
});

test('terminal shows up', () => {
  const { getByLabelText } = setup();
  const terminal = getByLabelText('terminal');
  expect(terminal).toBeInTheDocument();
});

test('small print program runs', () => {
  const { getByLabelText } = setup();
  const terminal = getByLabelText('terminal');
  expect(terminal).toBeInTheDocument();

  fireEvent.change(terminal, { target: { value: "10 print \"hello world\"\nrun" } });
  fireEvent.keyPress(terminal, { charCode: 13 }); // press enter
  expect(terminal.value).toBe(`10 print "hello world"
run
hello world
READY.`);
});

test('for loops', () => {
  const { getByLabelText } = setup();
  const terminal = getByLabelText('terminal');
  expect(terminal).toBeInTheDocument();

  fireEvent.change(terminal, { target: { value: "10 for i = 0 to 10 step 1\n20 print i\n30 next\nrun" } });
  fireEvent.keyPress(terminal, { charCode: 13 });
  expect(terminal.value).toBe(`10 for i = 0 to 10 step 1
20 print i
30 next
run
0

1

2

3

4

5

6

7

8

9

10
READY.`);
});