import { View, Text, StyleSheet } from "react-native";
import Animated
 from "react-native-reanimated";
function CircularProgress({ progress }) {
    console.log("CircularProgress", progress);

    const { interpolate, multiply } = Animated;

    return (
        <View>
            <Text style={styles.container}>Circular Progress</Text>
        </View>
    )
}

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    color: 'white',
  },
});