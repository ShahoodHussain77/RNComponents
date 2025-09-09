import { useEffect, useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  stopListening,
  startListening,
  addEventListener,
} from '@ascendtis/react-native-voice-to-text';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [result, setResult] = useState(null);
  const [isListening, setInListening] = useState(false);

  useEffect(() => {
    requestMicrophonePermission();

    // start event listeners
    const startEventListener = addEventListener('onSpeechStart', () => {
      setInListening(true);
    });

    const endEventListener = addEventListener('onSpeechEnd', () => {
      console.log('onSpeechEnd');
      setInListening(false);
    });

    const resultsEventListener = addEventListener('onSpeechResults', e => {
      console.log('onSpeechResults', e);
      setResult(e.value);
    });

    const errorEventListener = addEventListener('onSpeechError', e => {
      console.log('onSpeechError', e);
      setInListening(false);
    });

    const resultsPartialEventListener = addEventListener(
      'onSpeechPartialResults',
      e => {
        console.log('onSpeechPartialResults', e);
        setResult(e.value);
      },
    );

    return () => {
      // stop event listeners
      startEventListener.remove();
      endEventListener.remove();
      resultsEventListener.remove();
      errorEventListener.remove();
    };
  }, []);

  // Request microphone permission
  async function requestMicrophonePermission() {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'This app needs access to your microphone for speech recognition',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  const _handlePressButton = async () => {
    try {
      if (isListening) {
        await stopListening();
      } else {
        await startListening();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text>{result || 'Say some thing'}</Text>

        <Button
          title={isListening ? 'Stop listening' : 'Start listening'}
          onPress={_handlePressButton}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
