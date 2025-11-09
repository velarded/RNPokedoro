import { useContext, useEffect, useRef, useState } from "react";
import { PokemonGifContext } from "../context/PokemonGifContext";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { pokedexList } from "../../assets/data/pokedexList";
import CustomText from "../shared/CustomText";


const PokedexList = ({
        minValue = 1,
        maxValue = 100,
        step = 1,
        height = Dimensions.get('window').height,
        segmentHeight = 15,
        indicatorColor = '#fff',
        initialValue = 1,
    }) => {
    let { gifToLoad, hatchedPokemonName, hatchedPokemonDexNumber } = useContext(PokemonGifContext);
    hatchedPokemonDexNumber = 25; // todo - remove after
    const scrollViewRef = useRef(null);
    const [selectedValue, setSelectedValue] = useState(hatchedPokemonDexNumber);

    // calculated constants to use for segment positioning
    const centerOffset = (height / 2) - (segmentHeight / 2);

    useEffect(() => {
        console.log('useEffect - hatchedPokemonDexNumber', hatchedPokemonDexNumber);
        const initialScrollY = ((hatchedPokemonDexNumber - 1) / 1) * segmentHeight - centerOffset;
        console.log('initialScrollY', initialScrollY);
    }, [hatchedPokemonDexNumber]);

    const handleScroll = (event) => {
        console.log('handleScroll')
    };

    pokedexList.sort((a, b) => a.pokedexNo - b.pokedexNo);

    const pokedexListItems = [];
    let currentPokedexListNo = 1;
    console.log('start')
    pokedexList.forEach(pokemon => {
        console.log('pokemon: ', pokemon);
        let pokedexListItem;
        if (pokemon.pokedexNo > currentPokedexListNo) {
            for (let i = currentPokedexListNo; i < pokemon.pokedexNo; i++) {
                pokedexListItem = <CustomText style={{height: segmentHeight }} key={i}>No { i } --------</CustomText>;
                pokedexListItems.push(pokedexListItem);
            }
        }
        pokedexListItem = <CustomText style={{height: segmentHeight }} key={pokemon.pokedexNo}>No { pokemon.pokedexNo } {pokemon.name}</CustomText>;
        pokedexListItems.push(pokedexListItem);
        currentPokedexListNo = pokemon.pokedexNo + 1;
    });
    if (currentPokedexListNo < 100) {
           for (let i = currentPokedexListNo; i < 100; i++) {
                let pokedexListItem = <CustomText style={{height: segmentHeight }} key={i}>No { i } --------</CustomText>;
                pokedexListItems.push(pokedexListItem);
        }
    }

    return (
        <View style={styles.dexContainer}>
            <ScrollView         
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={}
                onScroll={handleScroll}
                snapToInterval={30}
                scrollEventThrottle={16}
                decelerationRate="fast"
                // style={styles.pokedexList}
            >
                { pokedexListItems }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    dexContainer: {
        padding: 5,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#EDC721',
        borderRadius: 10,
    },
});

export default PokedexList;