# Secure Todo App

A secure TODO list application built with React Native and Expo, featuring biometric authentication for sensitive operations.

## Features

- View todos without authentication
- Biometric authentication required for:
  - Adding new todos
  - Editing existing todos
  - Deleting todos
- Modern and clean UI
- Redux state management
- TypeScript support
- Unit tests

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

4. Run on iOS:
```bash
yarn ios
```

Or Android:
```bash
yarn android
```

## Testing

Run the test suite:
```bash
yarn test
```

## Project Structure

- `/app` - Main application code
  - `/components` - Reusable React components
  - `/store` - Redux store configuration and slices
  - `/hooks` - Custom React hooks
- `/__tests__` - Test files

## Security Features

The app uses Expo's Local Authentication module to implement biometric authentication (Face ID/Touch ID on iOS, Fingerprint on Android) for sensitive operations like adding, editing, or deleting todos.

## Tech Stack

- React Native
- Expo
- Redux Toolkit
- TypeScript
- Jest & React Native Testing Library
