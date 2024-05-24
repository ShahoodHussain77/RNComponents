import { ActivityIndicator, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

const App = () => {

  const [isImageLoading, setIsImageLoading] = useState(false)

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image

        source={{
          uri: `https://images.unsplash.com/photo-1526152505827-d2f3b5b4a52a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&v=${new Date()}`
        }}

        resizeMode='cover'

        style={{
          width: width - 20,
          height: 250
        }}

        onLoadStart={() => setIsImageLoading(true)}
        onLoad={() => setIsImageLoading(false)}

      />


      {
        isImageLoading && (
          <View style={styles.loadingStyles}>
            <ActivityIndicator animating={true} size={'large'} color={'#fff'} />
          </View>

        )
      }



    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingStyles: {
    position: 'absolute',
    backgroundColor: '#00000070',
    padding: 20,
    borderRadius: 15,
  }
})

export default App