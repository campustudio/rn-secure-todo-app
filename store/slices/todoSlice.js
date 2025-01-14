import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunks for handling side effects
export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Failed to load todos', error);
      return [];
    }
  }
);

export const saveTodos = createAsyncThunk(
  'todos/saveTodos',
  async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    } catch (error) {
      console.error('Failed to save todos', error);
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false
      };
      state.items.push(newTodo);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, ...updates } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        Object.assign(todo, updates);
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveTodos.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
