import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterPokedexInfoCard = () => {
    const pokemonAbility = 'Static';
    const abilityTextDesc = '30% chance of paralyzing opponent';
    const trainerMemoDesc = 'It stores electricity in the electric sacs on its cheeks. When it releases pent-up energy in a burst, the electric power is equal to a lightning bolt.';
    const pokemonType = 'ELECTRIC';

    return (
        <LinearGradient 
        colors={[
            '#318B74',  // 1 - 0 
            '#639DDD',  // 2 - 43%
            '#639DDD',  // 3 - 63%
            '#318B74',  // 4 - 100%
        ]}
        locations={[0, 0.43, 0.63, 1]}
        style={styles.pokemonInfoCard}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
            <View style={styles.typeContainer}>
                <View style={styles.header}>
                    <View style={styles.backgroundOval}></View>
                    <CustomText style={styles.headerLabel}>TYPE</CustomText>
                </View>
                <View style={styles.typeIcon}>
                    <CustomText>{ pokemonType }</CustomText>
                </View>
                {/* <Image style={styles.typeImg} source={require('../../assets/type-electric.png')}/> */}
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <View style={styles.header}>
                        <View style={styles.backgroundOval}></View>
                        <CustomText style={styles.headerLabel}>ABILITY</CustomText>
                    </View>
                    <CustomText style={styles.sectionText}>{ pokemonAbility }</CustomText>
                </View>
                <View style={styles.lineDivider}></View>
                <View style={styles.abilityDescription}>
                    <CustomText style={styles.sectionText}>{ abilityTextDesc }</CustomText>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>  
                    <View style={styles.header}>
                        <View style={styles.backgroundOval}></View>
                        <CustomText style={styles.headerLabel}>TRAINER MEMO</CustomText>
                    </View>
                </View>
                <View style={styles.trainerMemoDesc}>
                    <CustomText style={styles.sectionText}>{ trainerMemoDesc }</CustomText>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    pokemonInfoCard: {
        width: '100%',
        gap: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(100, 0, 100, 0.9)',
    },

    // == type section styles ==
    typeContainer: {
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9CDEA5',
        borderRadius: 10,
        padding: 10,
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLabel: {
        fontSize: 27,
        color: '#FFF',
        textShadowColor: '#000',
        textShadowOffset: { width: -1.5, height: 1.5 },
    },
    backgroundOval: {
        position: 'absolute',
        width: '100%',
        height: 10,
        borderRadius: 60,
        paddingHorizontal: 25,
        backgroundColor: '#016B63',
    },

    // == ability section styles ==
    sectionContainer: {
        gap: 5,
        backgroundColor: '#CEEEFF',
        borderRadius: 10,
        padding: 10,
    },
    sectionHeader: {
        position: 'relative',
        gap: 15,
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
    }, 
    sectionText: {
        fontSize: 18,
    },
    lineDivider: {
        height: 1,
        backgroundColor: '#60B088',
    },
    abilityDescription: {
        justifyContent: 'center',
    },

    // == trainer memo section styles ==
    trainerMemoContainer: {

    },
});

export default RegisterPokedexInfoCard;