import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import LoginScreen from './components/LoginScreen';
import { useAuth } from './context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const todos = useSelector((state: RootState) => state.todos.items);
  const { isAuthenticated, logout } = useAuth();

  console.log('App render - isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.welcomeText}>My Secure Todos</Text>
        <Pressable
          onPress={logout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed
          ]}
          hitSlop={20}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <AddTodo />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              id={item.id}
              text={item.text}
              completed={item.completed}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    minWidth: 80,
    alignItems: 'center',
  },
  logoutButtonPressed: {
    opacity: 0.8,
    backgroundColor: '#5000d6',
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
