import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import RegisterPokedexPokemonCard from "./pokedex-register/RegisterPokedexPokemonCard";
import RegisterPokedexInfoCard from "./pokedex-register/RegisterPokedexInfoCard";

const {width, height} = Dimensions.get('window');

const RegisterToPokedexView = ({ size = 120}) => {
    const navigation = useNavigation();
    const center = size / 2;
    const ringCount = 2; // Target logo has 3 rings
    const ringWidth = size / (ringCount * 2 + 2); // Calculate ring width

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.bgContainer]}>
                <Svg width={size} height={size} style={styles.pokeballBgLogo}>
            {/* Outer most ring */}
            <Circle
                cx={center}
                cy={center}
                r={center - ringWidth * 0}
                fill={'#000028'}
            />
            

            {/* Add a horizontal straight line */}
            <Path
            d={`M ${0} ${size / 2} L ${size} ${size / 2}`}
            stroke="#016B63"
            strokeWidth={15}
            />

            {/* 2nd outer ring */}
            <Circle
                cx={center}
                cy={center}
                r={center - ringWidth * 1.25}
                fill="#016B63"
            />
            {/* Middle red ring */}
            <Circle
                cx={center}
                cy={center}
                r={center - ringWidth * 2 + 5 }
                fill={'#000028'}
            />
                
            {/* Hide half of the pokeball logo */}
            <Path
            d={`M ${size / 4} ${0} L ${size / 4} ${size}`}
            stroke="#016B63"
            strokeWidth={size / 2 }
            /> 
                </Svg>
            </View>
            <View style={styles.contentContainer}>
                <RegisterPokedexPokemonCard />
                <RegisterPokedexInfoCard />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#016B63', // Set your desired background color
    },
    bgContainer: {
        position: 'absolute',
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokeballBgLogo: {
        right: '50%',
        transform: [{ scale: 3}],
    },
    contentContainer: {
        width: width - 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 40,
    },
});

export default RegisterToPokedexView;