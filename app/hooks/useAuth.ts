import { useState, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = useCallback(async () => {
    try {
      // Check if hardware supports biometric
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        throw new Error('Device does not support biometric authentication');
      }

      // Check if biometric is enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        throw new Error('No biometrics enrolled on this device');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your todos',
        fallbackLabel: 'Use passcode',
      });

      setIsAuthenticated(result.success);
      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    authenticate,
    logout,
  };
};

export default useAuth;
