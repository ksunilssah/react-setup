import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { increment, decrement } from '../features/counter/counterSlice';
import { useTheme } from '../context/ThemeContext';
import '../styles/Counter.scss';

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ background: theme.background, color: theme.text }}>
      <h2>Counter: {count}</h2>
      <button
        onClick={() => dispatch(increment())}
        style={{ background: theme.buttonBg, color: theme.buttonText }}
      >
        +
      </button>
      <button
        onClick={() => dispatch(decrement())}
        style={{ background: theme.buttonBg, color: theme.buttonText }}
      >
        -
      </button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
