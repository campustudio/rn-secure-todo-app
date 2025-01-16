import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../app/store/todoSlice';
import TodoItem from '../app/components/TodoItem';

// Mock the @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ testID }) => <div testID={testID}>Ionicons</div>,
}));

// Mock the useAuth hook
jest.mock('../app/hooks/useAuth', () => ({
  useAuth: () => ({
    authenticate: jest.fn().mockResolvedValue(true),
    isAuthenticated: true,
  }),
}));

describe('TodoItem', () => {
  const mockStore = configureStore({
    reducer: {
      todos: todoReducer,
    },
  });

  const mockTodo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <TodoItem {...mockTodo} />
      </Provider>
    );

    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('shows edit button', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <TodoItem {...mockTodo} />
      </Provider>
    );

    expect(getByTestId('edit-icon')).toBeTruthy();
  });

  it('shows delete button', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <TodoItem {...mockTodo} />
      </Provider>
    );

    expect(getByTestId('delete-icon')).toBeTruthy();
  });
});
