# Secure TODO List App

## Overview
A React Native TODO list application with local authentication using Expo's LocalAuthentication module.

## Features
- Secure authentication before accessing todo list
- Add, edit, and delete todo items
- Persistent storage using AsyncStorage
- State management with Redux Toolkit
- Loading and error states

## Prerequisites
- Node.js
- npm or yarn
- Expo CLI
- iOS or Android device/simulator

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`

## Running the App
- `npm start`: Start the Expo development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android simulator

## Running Tests
`npm test`

## Technologies Used
- React Native
- Expo
- Redux Toolkit (State Management)
- AsyncStorage
- LocalAuthentication

## Security Notes
- Requires device authentication before accessing todo list
- Uses local biometric or passcode authentication
