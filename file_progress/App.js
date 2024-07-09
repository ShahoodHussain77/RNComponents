import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        // Provide options to filter file types (adjust as needed)
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(result[0]); // Assuming single file selection
      console.log('File selected:', result[0]);
    } catch (err) {
      console.warn('Error picking document:', err);
      // Handle errors gracefully (e.g., display user-friendly message)
    }
  };

  const _handleDownload = () => {
    axios
      .get('http://localhost:3000/downloads/pdf/downloadPdf', {
        headers: {
          Accept: 'application/pdf',
        },
        responseType: 'blob',
      })
      .then(result => {
        console.log('response ', result);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const _handleUploadFile = () => {};

  return (
    <View style={styles.container}>
      <Text>Selected file: {selectedFile?.name || 'no file selected'}</Text>

      <TouchableOpacity onPress={pickDocument} style={styles.button}>
        <Text style={styles.text}>Open file picker</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={_handleUploadFile} style={styles.button}>
        <Text style={styles.text}>Upload file</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgb(221,72,48)',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 16,
    color: 'rgb(209,85,78)',
  },
});

export default App;
