import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const FILE_SIZE_TO_MB = 1024 * 1024;

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedProgress, setUploadedProgress] = useState(null);

  const _handleSelectFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      setSelectedFile(file[0]);
    } catch (error) {
      console.warn('error', error);
    }
  };

  const _handleUploadFile = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.type,
    });

    await axios
      .post('http://localhost:3000/downloads/pdf/uploadPdf', formData, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'multipart/form-data',
        },

        onUploadProgress: uploadProgress =>
          setUploadedProgress(uploadProgress.loaded),
      })
      .then(result => {
        console.log('result', result);
        setUploadedProgress(selectedFile.size);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const fileSize = selectedFile
    ? (selectedFile.size / FILE_SIZE_TO_MB).toFixed(2)
    : 0;

  const uploadedSize = uploadedProgress
    ? (uploadedProgress / FILE_SIZE_TO_MB).toFixed(2)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {uploadedSize}/{fileSize}
        </Text>
      </View>

      <Text>Selected file: {selectedFile?.name || 'no file selected'}</Text>

      <TouchableOpacity style={styles.button} onPress={_handleSelectFile}>
        <Text style={styles.text}>Open file picker</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={_handleUploadFile}>
        <Text style={styles.text}>Upload file</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginVertical: 40,
  },
  progressText: {
    fontSize: 28,
    transform: [{scale: 1.5}],
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
