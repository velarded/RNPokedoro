import { StyleSheet, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

export const SelectedSpriteCard = () => {
    let { gifToLoad, hatchedPokemonName, hatchedPokemonDexNumber } = useContext(PokemonGifContext);

    // TODO: remove after context is dynamic
    gifToLoad = require('../../assets/pikachu-sprite.gif');
    hatchedPokemonName = 'Pikachu';
    hatchedPokemonDexNumber = 25;
    
    return (
        <View style={styles.pokemonSpriteOuter}>
            <View style={styles.pokemonSpriteInner}>
                { gifToLoad && <Image style={styles.pokemonGif} source={gifToLoad}/> }
            </View>
            <Svg style={styles.whiteArrow} width={25} height={25 * 2} viewBox="0 0 16 32">
                <Polygon
                    points="0,0 16,16 0,32"
                    fill="white"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({

});