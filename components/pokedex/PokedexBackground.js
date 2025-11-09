import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const {width, height} = Dimensions.get('window');
export const PokedexBackground = ({ size = 120}) => {    
    const center = size / 2;
    const ringCount = 2; // Target logo has 3 rings
    const ringWidth = size / (ringCount * 2 + 2); // Calculate ring width

    return (

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
            stroke="#394EBF"
            strokeWidth={15}
            />

            {/* 2nd outer ring */}
            <Circle
                cx={center}
                cy={center}
                r={center - ringWidth * 1.25}
                fill="#394EBF"
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
            stroke="#394EBF"
            strokeWidth={size / 2 }
            /> 
                </Svg>
            </View>
    );
};

const styles = StyleSheet.create({
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
});