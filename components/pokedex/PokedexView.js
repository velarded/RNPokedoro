import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Circle, Line, Path, Polygon } from "react-native-svg";
import CustomText from '../shared/CustomText';
import { useContext, useRef, useState } from "react";
import { PokemonGifContext } from "../context/PokemonGifContext";
import { globalStyles } from "../../styles/global";
import { pokedexList } from "../../assets/data/pokedexList";
import PokedexList from "./TestPokedexList";
import PokedexUserStats from "./PokedexUserStats";
import { PokedexBackground } from "./PokedexBackground";

const PokedexView = () => {
    let { gifToLoad, hatchedPokemonName, hatchedPokemonDexNumber } = useContext(PokemonGifContext);

    // TODO: remove after context is dynamic
    gifToLoad = require('../../assets/pikachu-sprite.gif');
    hatchedPokemonName = 'Pikachu';
    hatchedPokemonDexNumber = 25;

    return (
        <View style={styles.mainContainer}>
            <PokedexBackground />
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.pokedexTitle}>POKÉDEX</CustomText>
                </View>
                <View style={styles.columnContent}>
                    <View style={styles.leftColumn}>
                        <View style={styles.pokemonSpriteOuter}>
                            <View style={styles.pokemonSpriteInner}>
                                { gifToLoad && <Image style={styles.pokemonGif} source={gifToLoad}/> }
                            </View>
                            {/* <View style={styles.whiteArrow}></View> */}
                            <Svg style={styles.whiteArrow} width={25} height={25 * 2} viewBox="0 0 16 32">
                                    <Polygon
                                    points="0,0 16,16 0,32"
                                    fill="white"
                                    />
                            </Svg>
                        </View>
                        <PokedexUserStats />
                    </View>
                    <PokedexList />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
     mainContainer: {
        flex: 1,
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center', //fix this
        backgroundColor: '#394EBF', // Set your desired background color
        position: 'relative',
    },
    contentContainer: {
        width: '70%',
        height: '80%',
        // backgroundColor: 'rgba(255, 0 ,0, 0.5)',
        gap: 15,
    },
    titleContainer: {
        alignItems: 'center'
    },
    pokedexTitle: {
        backgroundColor: '#F8F8F8',
        borderRadius: 3.75,
        padding: 10,
        fontSize: 80,
        letterSpacing: -2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 0,
        transform: [{ scaleY: 0.5}]
    },
    columnContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
        // backgroundColor: 'rgba(0, 255 ,0, 1)',
    },
    leftColumn: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'rgba(10, 255, 255, 1)',
        position: 'relative',
        gap: 5,
        zIndex: 999,
    },
    section: {
        alignItems: 'center',
        gap: 5,
        color: 'white',
    },
    pokedexList: {
        padding: 5,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#EDC721',
        borderRadius: 10,
        width: '25%'
    },
    pokemonSpriteOuter: {
        width: '100%',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 3.5,
        backgroundColor: 'white',
        position: 'relative',
    },
    whiteArrow: {
        position: 'absolute',
        // width: 50,
        // height: 50,
        // backgroundColor: 'black',
        right: -25,
        top: '50%',
        marginTop: -25,
        // transform: 'translateX(150%), translateY(50%)'
        zIndex: 999,
    },
    pokemonSpriteInner: {
        height: 150,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokemonGif: {
        transform: 'scale(1.5)'
    },
});

export default PokedexView;