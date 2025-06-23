import { View, StyleSheet, Image } from "react-native";
import EggHatchingBackground from "./shared/EggHatchingBackground";
import { useContext } from "react";
import { PokemonGifContext } from "./context/PokemonGifContext";
import DialogBox from "./DialogBox";
import { useNavigation } from "@react-navigation/native";

const PokemonRevealView = () => {
    const navigation = useNavigation();
    const { gifToLoad, hatchedPokemonName } = useContext(PokemonGifContext);
    const pokemonName = hatchedPokemonName.toUpperCase();
    console.log('loaded pokeon reveal view, ', hatchedPokemonName);

    const changeToPokedexRegisterScreen = () => {
          console.log('move to pokedex register screen');
        navigation.navigate('RegisterToPokedex');
    }
    return (
        <EggHatchingBackground>
            { gifToLoad && <Image style={styles.pokemonGif} source={gifToLoad}/> }
            { <DialogBox onPress={changeToPokedexRegisterScreen}>{`${pokemonName} hatched from the egg!`}</DialogBox> }
        </EggHatchingBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pokemonGif: {
        width: 100,
        height: 100,
        zIndex: 9999,
        alignSelf: 'center',
        position: 'absolute',
        top: '50%', // Start at the center
        transform: [{ translateY: -70 }], // Move up by 100px
    }
  });
export default PokemonRevealView;