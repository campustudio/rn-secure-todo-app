import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, SafeAreaView, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { addTodo, removeTodo, updateTodo, loadTodos, saveTodos } from './store/slices/todoSlice';

// Main App component wrapper with Redux Provider
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// Main App component
function App() {
  // State for authentication and new todo input
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  // Redux hooks
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);
  const status = useSelector(state => state.todos.status);
  const error = useSelector(state => state.todos.error);

  // Load todos on app startup
  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  // Save todos whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      dispatch(saveTodos(todos));
    }
  }, [todos, dispatch]);

  // Authenticate user before accessing todo list
  const authenticateUser = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your TODO list',
        fallbackLabel: 'Use passcode',
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        Alert.alert('Authentication Failed', 'Could not verify your identity');
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  // Handle adding or updating a todo
  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    if (editingTodo) {
      dispatch(updateTodo({ id: editingTodo.id, text: newTodo }));
      setEditingTodo(null);
    } else {
      dispatch(addTodo({ text: newTodo }));
    }
    setNewTodo('');
  };

  // Render todo item
  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
        {item.text}
      </Text>
      <View style={styles.todoActions}>
        <TouchableOpacity onPress={() => {
          setEditingTodo(item);
          setNewTodo(item.text);
        }}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Show loading state
  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <Text>Loading todos...</Text>
      </View>
    );
  }

  // Show error state
  if (status === 'failed') {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // If not authenticated, show authentication screen
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Secure TODO List</Text>
        <TouchableOpacity style={styles.authButton} onPress={authenticateUser}>
          <Text style={styles.authButtonText}>Authenticate</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Authenticated view with todo list
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Secure TODO List</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder={editingTodo ? 'Edit todo' : 'Enter new todo'}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>
            {editingTodo ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.todoList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  todoActions: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#007bff',
    marginRight: 10,
  },
  deleteButton: {
    color: '#dc3545',
  },
  authButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  authButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
