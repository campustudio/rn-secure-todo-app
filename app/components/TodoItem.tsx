import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../store/todoSlice';
import { Ionicons } from '@expo/vector-icons';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoItem({ id, text, completed }: TodoItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteTodo(id)),
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: 'light',
      }
    );
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editTodo({ id, text: editedText }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleToggle}
        style={styles.todoContent}
        hitSlop={8}
      >
        <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
          <Ionicons 
            name={completed ? "checkbox" : "square-outline"} 
            size={20} 
            color={completed ? "#6200ee" : "#6200ee"} 
          />
        </View>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            onBlur={handleEdit}
            autoFocus
          />
        ) : (
          <Text style={[styles.text, completed && styles.textCompleted]}>
            {text}
          </Text>
        )}
      </Pressable>
      <View style={styles.buttons}>
        <Pressable
          onPress={handleEdit}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed
          ]}
          hitSlop={8}
        >
          <Ionicons 
            name={isEditing ? "checkmark" : "pencil"} 
            size={20} 
            color="#6200ee" 
          />
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed
          ]}
          hitSlop={8}
        >
          <Ionicons name="trash-outline" size={20} color="#ff3b30" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    padding: 0,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
    borderRadius: 8,
  },
  iconButtonPressed: {
    backgroundColor: '#f8f8f8',
  },
});
