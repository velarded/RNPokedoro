import { Image, StyleSheet, View } from "react-native";
import CustomText from "../shared/CustomText";


const PokedexUserStats = () => {
    // left side stats component, this would come from a DB
    const totalHrsFocused = 236;
    const currentMonthHrsFocused = 78;
    const currentWeekHrsFocused = 13;
    const currentDayHrsFocused = 2;
    const numOfEggsHatched = 10;
    const pokemonSeen = 4;

    return (
        <View>
            <View style={styles.section}> 
                <CustomText style={styles.whiteText}>DAY STREAK</CustomText>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />
                <View style={styles.statRow}>
                    <Image source={require('../../assets/streak-icon.png')}/>
                    <CustomText style={styles.whiteText}>10</CustomText>
                </View>
            </View>
            <View style={[styles.section, styles.hoursFocusedSection]}>
                <CustomText style={styles.whiteText}>HOURS FOCUSED</CustomText>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />
                <View style={styles.hoursFocusedStats}>
                    <View style={styles.statRow}>
                        <CustomText style={styles.whiteText}>TOTAL</CustomText>
                        <CustomText style={styles.whiteText}>{ totalHrsFocused ? totalHrsFocused : '0' } HRS</CustomText>
                    </View>
                    <View style={styles.statRow}>
                        <CustomText style={styles.whiteText}>MONTH</CustomText>
                        <CustomText style={styles.whiteText}>{ currentMonthHrsFocused ? currentMonthHrsFocused : '0' } HRS</CustomText>
                    </View>
                    <View style={styles.statRow}>
                        <CustomText style={styles.whiteText}>WEEK</CustomText>
                        <CustomText style={styles.whiteText}>{ currentWeekHrsFocused ? currentWeekHrsFocused : '0' } HRS</CustomText>
                    </View>
                    <View style={styles.statRow}>
                        <CustomText style={styles.whiteText}>DAY</CustomText>
                        <CustomText style={styles.whiteText}>{ currentDayHrsFocused ? currentDayHrsFocused : '0' } HRS</CustomText>
                    </View>
                </View>
            </View>
            <View style={[styles.section, styles.eggsHatchedSection]}>
                <CustomText style={styles.whiteText}>EGGS HATCHED</CustomText>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />
                    <CustomText style={styles.whiteText}>{numOfEggsHatched}</CustomText>
            </View>
            <View style={[styles.section, styles.pokemonSeenSection]}>
                <CustomText style={styles.whiteText}>POKEMON SEEN</CustomText>
                <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />
                <CustomText style={styles.whiteText}>{pokemonSeen}</CustomText>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    section: {
        alignItems: 'center',
        gap: 5,
    },
    whiteText: {
        color: 'white',
    },
    statRow: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between'
    },
});

export default PokedexUserStats;