import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const EggHatchingBackground = ({ children}) => {
    return (
    <LinearGradient
        colors={[
            '#4AC6A5',  // 1 - 0 to (centre - 14%)
            '#6BD6BD',  // 2 - -2%
            '#94E7CE',  // 3 - -3%
            '#A5E7DE',  // 4 - 50%
            '#CEF7E7',  // 3 - +3%
            '#F7FFF7',  // 2 + 4%
            '#FFFFFF',  // 1 - (centre + 10%) to 1
        ]}
        locations={[0, 0.44, 0.46, 0.48, 0.50, 0.53, 1]}
        style={styles.container}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
            { children }
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default EggHatchingBackground;