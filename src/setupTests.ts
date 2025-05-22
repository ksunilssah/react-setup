import '@testing-library/jest-dom';

global.fetch = jest.fn();

jest.mock('./context/ThemeContext');
