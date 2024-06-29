import '@testing-library/jest-dom';
import { render, screen,fireEvent } from '@testing-library/react';
import Home from '@/pages/index.js';
import { useRouter } from 'next/router';
describe('Home Component', () => {
  beforeEach(() => {
    // Clear localStorage and set up spies
    localStorage.clear();
    jest.spyOn(localStorage.__proto__, 'setItem');
    jest.spyOn(localStorage.__proto__, 'getItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });



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


//  When quantity buttons are clicked, it loads up the page
test('loads game when quantity button is clicked', () => {
  render(<Home />);
  const startButton = screen.getByRole('button', { name: "Start Game" });
  fireEvent.click(startButton);
  // Query the first quantity button
  
  const linkElement = screen.getByRole('link', { name: /1/i });

  // Simulate a click on the link
  fireEvent.click(linkElement);

  // Check if it loads the game
  expect(linkElement).toHaveAttribute('href', '/game');
});


test('Checks if it sets and gets local storage correctly', async () => {
  render(<Home />);

  // Find and click the start button
  const startButton = screen.getByRole('button', { name: 'Start Game' });
  fireEvent.click(startButton);

  // Find the input field and type a name
  const inputName = screen.getByPlaceholderText('Enter name..');
  fireEvent.change(inputName, { target: { value: 'Evangelos' } });
  
  // Fire blur event to simulate input completion
  fireEvent.blur(inputName);

  // Check if localStorage.setItem was called with the correct arguments
  expect(localStorage.setItem).toHaveBeenCalledWith('PlayerName', 'Evangelos');
});
});