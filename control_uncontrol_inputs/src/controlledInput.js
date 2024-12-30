import React, {useState} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

const {width} = Dimensions.get('window');

const ControlledInput = () => {
  const [value, setValue] = useState('');

  return (
    <View>
      <TextInput
        placeholder="controlled input"
        value={value}
        onChangeText={text => setValue(text)}
        style={styles.input}
      />
    </View>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: width - 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a1a1a1',
    paddingHorizontal: 10,
  },
});
