import { configureStore } from '@reduxjs/toolkit';
import todoReducer, {
  addTodo,
  removeTodo,
  updateTodo,
  loadTodos,
  saveTodos
} from '../store/slices/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('Todo Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todoReducer
      }
    });
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
  });

  test('should add a todo', () => {
    store.dispatch(addTodo({ text: 'Test Todo' }));
    
    const state = store.getState().todos;
    expect(state.items.length).toBe(1);
    expect(state.items[0].text).toBe('Test Todo');
    expect(state.items[0].completed).toBe(false);
  });

  test('should remove a todo', () => {
    // Add a todo first
    store.dispatch(addTodo({ text: 'Test Todo' }));
    const todoId = store.getState().todos.items[0].id;
    
    // Remove the todo
    store.dispatch(removeTodo(todoId));
    
    const state = store.getState().todos;
    expect(state.items.length).toBe(0);
  });

  test('should update a todo', () => {
    // Add a todo first
    store.dispatch(addTodo({ text: 'Original Todo' }));
    const todoId = store.getState().todos.items[0].id;
    
    // Update the todo
    store.dispatch(updateTodo({ id: todoId, text: 'Updated Todo', completed: true }));
    
    const state = store.getState().todos;
    expect(state.items.length).toBe(1);
    expect(state.items[0].text).toBe('Updated Todo');
    expect(state.items[0].completed).toBe(true);
  });

  test('should load todos', async () => {
    const mockTodos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: true }
    ];
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockTodos));

    await store.dispatch(loadTodos());
    
    const state = store.getState().todos;
    expect(state.items).toEqual(mockTodos);
    expect(state.status).toBe('succeeded');
  });

  test('should handle load todos error', async () => {
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Failed to load'));

    await store.dispatch(loadTodos());
    
    const state = store.getState().todos;
    expect(state.status).toBe('failed');
    expect(state.error).toBeTruthy();
  });

  test('should save todos', async () => {
    const todos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: true }
    ];

    await store.dispatch(saveTodos(todos));
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(todos));
  });
});
