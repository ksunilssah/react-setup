import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Counter } from './Counter';

describe('Counter', () => {
  it('renders counter with initial value', () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
    expect(screen.getByText(/Counter: 0/i)).toBeInTheDocument();
  });

  it('increments value on + button click', () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument();
  });
});
