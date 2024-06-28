import '@testing-library/jest-dom';
import { render, screen,fireEvent } from '@testing-library/react';
import Home from '@/pages/index.js';

test('renders the Start Button', () => {
  render(<Home />);
  const startButton = screen.getByRole('button', { name: "Start Game" });
  expect(startButton).toBeInTheDocument();
});


test('renders the Uno Logo', () => {
  render(<Home />);
  const unoLogo = screen.getByAltText("unoLogo");
  expect(unoLogo).toBeInTheDocument();
});

// When start button is clicked inout box and select quanity boxex appear
test('Input box and Select quanitity of players appear', () => {
  const { container } = render(<Home />);
  const startButton = screen.getByRole('button', { name: "Start Game" });
  fireEvent.click(startButton);

  const inputName = screen.getByPlaceholderText('Enter name..')
  expect(inputName).toBeInTheDocument();

  const quanitityOfPlayers = container.querySelector('.amtBtns');
  expect(quanitityOfPlayers).toBeInTheDocument();


})