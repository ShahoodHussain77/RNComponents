import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ControlledInput from './src/controlledInput';
import UncontrolledInput from './src/uncontrolledInput';

const App = () => {
  return (
    <View style={styles.container}>
      <ControlledInput />
      <UncontrolledInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
