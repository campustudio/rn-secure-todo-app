import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import { Ionicons } from '@expo/vector-icons';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a new todo..."
        placeholderTextColor="#888"
        returnKeyType="done"
        onSubmitEditing={handleAdd}
        blurOnSubmit={false}
      />
      <Pressable
        onPress={handleAdd}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed
        ]}
        hitSlop={8}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
    color: '#1a1a1a',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    opacity: 0.8,
    backgroundColor: '#5000d6',
  },
});

export default AddTodo;
