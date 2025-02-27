import { View, StyleSheet, Platform } from "react-native";
import CustomText from "./CustomText";
const Header = () => {
    return (
        <View style={styles.header}>
            <CustomText>Pokedoro</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#385655",
        height: 100,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",

            // iOS Shadow (Bottom Only)
    ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 }, // Shadow at the bottom
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 5, // Uniform shadow on Android
        },
      }),
    }
});

export default Header;