import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthProvider from './context/AuthContext';

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Secure Todo App',
            }}
          />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
