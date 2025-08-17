/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  View,
  Button,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';

import React, { useState } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // State for images picked from gallery and camera
  const [galleryImages, setGalleryImages] = useState<Asset[]>([]);
  const [cameraImages, setCameraImages] = useState<Asset[]>([]);

  const _handlePressLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeExtra: true,
      quality: 1,
      formatAsMp4: false,
      assetRepresentationMode: 'auto',
      presentationStyle: 'fullScreen',
      includeBase64: false,
      selectionLimit: 0,
      videoQuality: 'high',
    });
    if (result.assets && result.assets.length > 0) {
      setGalleryImages(result.assets);
    }
    console.log('Selected images from gallery:', result);
  };

  const _handlePressCamera = async () => {
    const result = await launchCamera({
      mediaType: 'mixed',
      includeExtra: true,
      formatAsMp4: false,
      assetRepresentationMode: 'auto',
      durationLimit: 60,
      videoQuality: 'high',
      includeBase64: false,
      saveToPhotos: false,
      cameraType: 'back',
      quality: 1,
    });
    if (result.assets && result.assets.length > 0) {
      setCameraImages(result.assets);
    }
    console.log('Selected images from camera:', result);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {/* Gallery Images Section */}
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}
            >
              Gallery Images
            </Text>

            <Button
              title="Open Gallery"
              onPress={_handlePressLibrary}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </View>

          <View style={styles.imagesRow}>
            {galleryImages.length === 0 && (
              <Text style={{ color: isDarkMode ? '#aaa' : '#888' }}>
                No images selected from gallery.
              </Text>
            )}
            {galleryImages.map((img, idx) =>
              img.uri ? (
                <Image
                  key={img.uri + idx}
                  source={{ uri: img.uri }}
                  style={styles.imageBox}
                  resizeMode="cover"
                />
              ) : null,
            )}
          </View>
        </View>

        {/* Camera Images Section */}
        <View style={{ marginTop: 30, marginBottom: 40 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}
            >
              Camera Images
            </Text>

            <Button
              title="Open Camera"
              onPress={_handlePressCamera}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </View>

          <View style={styles.imagesRow}>
            {cameraImages.length === 0 && (
              <Text style={{ color: isDarkMode ? '#aaa' : '#888' }}>
                No images captured from camera.
              </Text>
            )}
            {cameraImages.map((img, idx) =>
              img.uri ? (
                <Image
                  key={img.uri + idx}
                  source={{ uri: img.uri }}
                  style={styles.imageBox}
                  resizeMode="cover"
                />
              ) : null,
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    minHeight: 60,
  },
  imageBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
});

export default App;
