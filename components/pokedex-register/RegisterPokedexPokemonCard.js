import { useContext } from 'react';
import { PokemonGifContext } from '../context/PokemonGifContext';
import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';

const RegisterPokedexPokemonCard = () => {
    let { gifToLoad, hatchedPokemonName, hatchedPokemonDexNumber } = useContext(PokemonGifContext);

    // TODO: remove after context is dynamic
    gifToLoad = require('../../assets/pikachu-sprite.gif');
    hatchedPokemonName = 'Pikachu';
    hatchedPokemonDexNumber = 25;


    // For 20px repeating pattern (10px per color)
    const stripeCount = 60; // Enough to fill most screens
    const stripeHeight = 3; // Enough to fill most screens
    const color1 = '#D0D0B8';
    const color2 = '#DDE8F7';

    return (
        <View style={styles.pokemonCardContainer}>
            <View style={styles.darkInnerBorderContainer}>
            <View style={styles.lightInnerContainer}>
                <View style={styles.pokemonCardContent}>
                    <View style={styles.pokemonLabel}>
                        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <CustomText style={styles.pokemonLabelText}>No{hatchedPokemonDexNumber && String(hatchedPokemonDexNumber).padStart(3, '0')}</CustomText>
                            <Image style={styles.pokeballImg} source={require('../../assets/pokeball.png')}/>
                        </View>
                        <CustomText style={[styles.pokemonLabelText, { textTransform: 'uppercase' }]}>{hatchedPokemonName}</CustomText>
                    </View>
                    <View style={styles.stripedBackground}>
                        {Array.from({ length: stripeCount }).map((_, i) => (
                            <View
                            key={i}
                            style={[
                                styles.stripe,
                                {
                                height: stripeHeight,
                                backgroundColor: i % 2 === 0 ? color1 : color2,
                                top: i * stripeHeight,
                                }
                            ]}
                            />
                        ))}
                        { gifToLoad && <Image style={styles.pokemonGif} source={gifToLoad}/> }
                    </View>
                    <View style={styles.pokemonGender}></View>
                </View>
            </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    pokemonCardContainer: {
        width: '100%',
        backgroundColor: '#98D8A0',
        borderRadius: 10,
        borderColor: '#60B088',
        borderWidth: 1,
        height: 250,
    },
    darkInnerBorderContainer: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#98D8A0',
        backgroundColor: '#60B088',
        borderRadius: 10,
    },
    lightInnerContainer: {
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: '#60B088',
        backgroundColor: '#98D8A0',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokemonCardContent: {
        position: 'relative',
        width: '60%',
        height: '100%',
        flex: 1,
    },
    pokemonLabel: {
        paddingHorizontal: 2.5,
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        alignItems: 'center',
    },
    pokemonLabelText: {
        color: '#fff',
        fontSize: 28,
        textShadowColor: '#606060',
        textShadowOffset: { width: -1, height: 2 },
    },
    pokeballImg: {
        width: 18,
        height: 18,
    },
    stripedBackground: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    stripe: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    pokemonGif: {
        transform: 'scale(1.75)'
    },
    pokemonGender: {
        width: '100%',
        flex: 0.2,
    },
});

export default RegisterPokedexPokemonCard;