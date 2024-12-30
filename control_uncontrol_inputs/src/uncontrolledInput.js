import React, {useRef} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

const UncontrolledInput = () => {
  const inputRef = useRef(null);

  const _handlePressButton = () => {
    const data = inputRef.current.value;
    console.log(data);
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        placeholder="uncontrolled input"
        style={styles.input}
        onChangeText={e => (inputRef.current.value = e)} // Store the value in the ref
      />

      <Button title="GET VALUE" onPress={_handlePressButton} />
    </View>
  );
};

export default UncontrolledInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: width - 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a1a1a1',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
