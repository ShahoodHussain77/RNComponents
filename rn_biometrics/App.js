/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNBiometrics from 'react-native-easy-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_KEYS = {
  AUTH_ENABLED: 'isAuthEnabled',
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthEnabled, setIsAuthEnabled] = useState(false);

  const backgroundStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const checkAuthEnabled = async () => {
      try {
        const value = await AsyncStorage.getItem(ASYNC_KEYS.AUTH_ENABLED);

        if (value !== null) {
          setIsAuthEnabled(value === 'true');

          // If authentication is enabled, check faceID or fingerprint authentication
          if (value === 'true') {
            _handlePressAuthenticate();
          }
        }
      } catch (error) {
        // Handle error
        console.error('Error retrieving authentication status:', error);
      }
    };

    setTimeout(() => {
      checkAuthEnabled();
    }, 2000);
  }, []);

  const _handlePressAuthenticate = async () => {
    // Check if biometric authentication is available
    const can = await RNBiometrics.canAuthenticate();
    console.log('canAuthenticate', can);

    if (can) {
      try {
        const results = await RNBiometrics.requestBioAuth(
          'prompt-title',
          'prompt-message',
        );
        setIsAuthenticated(true);
      } catch (error) {
        // Code to handle authentication failure
        // ...
        console.log('Authentication failed:', error);
        setIsAuthenticated(false);
      }
    }
  };

  const _handleSetAuthEnabled = async () => {
    try {
      if (isAuthEnabled) {
        // Disable authentication
        await AsyncStorage.removeItem(ASYNC_KEYS.AUTH_ENABLED);
        setIsAuthEnabled(false);
      } else {
        // Enable authentication
        await AsyncStorage.setItem(ASYNC_KEYS.AUTH_ENABLED, 'true');
        setIsAuthEnabled(true);
      }
    } catch (error) {
      // Handle error
      console.error('Error setting authentication:', error);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={_handleSetAuthEnabled}
          style={styles.checkbox}>
          {isAuthEnabled && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text>Authenticate app with phone security</Text>
      </View>

      {isAuthenticated ? (
        <Text style={styles.sectionTitle}>Authenticated</Text>
      ) : (
        <>
        <Text style={styles.sectionTitle}>Not Authenticated</Text>
        <View style={styles.spacer} />
      <Button title="Authorize me" onPress={_handlePressAuthenticate} />
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 0.7,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
  spacer: {
    height: 10,
  },
});

export default App;
