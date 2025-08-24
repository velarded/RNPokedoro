import { View, StyleSheet, Image } from "react-native";
import { Video } from 'expo-av';
import React, { useContext, useRef } from "react";
import eggHatchingVideo from '../assets/egg-hatching.mp4';
import EggHatchingBackground from "./shared/EggHatchingBackground";
import { useNavigation } from '@react-navigation/native';
import { PokemonGifContext } from "./context/PokemonGifContext";

const EggHatchingView = () => {
    const { setGifToLoad, setHatchedPokemonName, setHatchedPokemonDexNumber } = useContext(PokemonGifContext);
    const navigation = useNavigation();
    const videoRef = useRef(null);
    

    const handlePlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
          console.log('egg hatching animation is done!');
          setGifToLoad(require('../assets/pikachu-sprite.gif'));
          setHatchedPokemonName('Pikachu')
          setHatchedPokemonDexNumber(25);
            navigation.navigate('PokemonReveal');
        }    
    };

    return (
    <EggHatchingBackground>
            <View style={styles.videoContainer}>

                <View style={styles.circle}>
                    <Video
                        source={eggHatchingVideo} // replace with your own .mp4 URL
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        useNativeControls={false}
                        isLooping={false}
                        style={styles.video}
                        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                    />
                </View>
            </View>
        </EggHatchingBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100, // Half of width/height to make a circle
        overflow: 'hidden', // This clips the video to the circle
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
        transform: [{ scale: 1.05}, { translateX: 1 }]
    },
  });
export default EggHatchingView;