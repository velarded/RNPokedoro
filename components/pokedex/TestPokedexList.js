import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');
const POKEMON_DATA = [
  { id: 1, name: 'Bulbasaur', type: 'Grass/Poison', color: '#78C850', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 2, name: 'Ivysaur', type: 'Grass/Poison', color: '#78C850', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
  { id: 3, name: 'Venusaur', type: 'Grass/Poison', color: '#78C850', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
  { id: 4, name: 'Charmander', type: 'Fire', color: '#F08030', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 5, name: 'Charmeleon', type: 'Fire', color: '#F08030', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
  { id: 6, name: 'Charizard', type: 'Fire/Flying', color: '#F08030', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
  { id: 7, name: 'Squirtle', type: 'Water', color: '#6890F0', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: 8, name: 'Wartortle', type: 'Water', color: '#6890F0', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
  { id: 9, name: 'Blastoise', type: 'Water', color: '#6890F0', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
  { id: 10, name: 'Caterpie', type: 'Bug', color: '#A8B820', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
];

const WhiteArrow = () => (
  <View style={styles.whiteArrowContainer}>
    <View style={styles.whiteArrow} />
  </View>
);

const PokedexList = () => {
  const [selectedId, setSelectedId] = useState(1);
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const itemSize = 80;
  const spacerSize = (height - itemSize) / 2;

  // Scroll to selected item
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: (selectedId - 1) * itemSize,
        animated: true
      });
    }
  }, [selectedId]);

  // Handle scroll events
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  // Handle momentum scroll end to snap to nearest item
  const handleMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemSize);
    setSelectedId(Math.min(Math.max(1, index + 1), POKEMON_DATA.length));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POKÉDEX</Text>
      
      <View style={styles.contentContainer}>
        {/* White Arrow Component (sibling) */}
        <WhiteArrow />
        
        {/* Pokedex List with Selector */}
        <View style={styles.listContainer}>
          {/* Ruler indicator - aligned with white arrow */}
          <View style={styles.rulerContainer}>
            <View style={styles.rulerLine} />
            <View style={styles.rulerCenter} />
          </View>
          
          {/* Pokemon list */}
          <View style={styles.scrollContainer}>
            <Animated.ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={itemSize}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              contentContainerStyle={{
                paddingTop: spacerSize,
                paddingBottom: spacerSize,
              }}
            >
              {POKEMON_DATA.map((pokemon, index) => {
                const inputRange = [
                  (index - 2) * itemSize,
                  (index - 1) * itemSize,
                  index * itemSize,
                  (index + 1) * itemSize,
                  (index + 2) * itemSize,
                ];
                
                const scale = scrollY.interpolate({
                  inputRange,
                  outputRange: [0.8, 0.9, 1, 0.9, 0.8],
                  extrapolate: 'clamp',
                });
                
                const opacity = scrollY.interpolate({
                  inputRange,
                  outputRange: [0.5, 0.7, 1, 0.7, 0.5],
                  extrapolate: 'clamp',
                });
                
                const isSelected = pokemon.id === selectedId;
                
                return (
                  <TouchableOpacity 
                    key={pokemon.id}
                    onPress={() => setSelectedId(pokemon.id)}
                    activeOpacity={0.7}
                  >
                    <Animated.View style={[
                      styles.pokemonItem,
                      { 
                        backgroundColor: pokemon.color,
                        transform: [{ scale }],
                        opacity,
                        borderColor: isSelected ? '#FFCC00' : 'transparent',
                        borderWidth: isSelected ? 3 : 0,
                        elevation: isSelected ? 10 : 2,
                      }
                    ]}>
                      <Image 
                        source={{ uri: pokemon.image }} 
                        style={styles.pokemonImage} 
                        resizeMode="contain"
                      />
                      <View style={styles.pokemonInfo}>
                        <Text style={styles.pokemonName}>{pokemon.name}</Text>
                        <Text style={styles.pokemonType}>{pokemon.type}</Text>
                      </View>
                      <Text style={styles.pokemonNumber}>#{pokemon.id.toString().padStart(3, '0')}</Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </Animated.ScrollView>
          </View>
        </View>
      </View>
      
      {/* Selected Pokemon details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.selectedText}>SELECTED POKÉMON</Text>
        </View>
        {POKEMON_DATA.filter(p => p.id === selectedId).map(pokemon => (
          <View key={pokemon.id} style={[styles.detailsCard, { backgroundColor: pokemon.color }]}>
            <Image 
              source={{ uri: pokemon.image }} 
              style={styles.detailsImage} 
              resizeMode="contain"
            />
            <View style={styles.detailsText}>
              <Text style={styles.detailsName}>{pokemon.name}</Text>
              <Text style={styles.detailsType}>Type: {pokemon.type}</Text>
              <Text style={styles.detailsNumber}>#{pokemon.id.toString().padStart(3, '0')}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFCC00',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  whiteArrowContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  whiteArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '90deg' }],
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    height: height * 0.5,
  },
  rulerContainer: {
    position: 'absolute',
    left: -35, // Position to align with the white arrow
    right: 0,
    top: height * 0.25,
    zIndex: 10,
    alignItems: 'flex-start',
    pointerEvents: 'none',
  },
  rulerLine: {
    width: '105%',
    height: 2,
    backgroundColor: '#FFCC00',
    marginLeft: 35, // Align with the arrow
  },
  rulerCenter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFCC00',
    position: 'absolute',
    top: -5,
    left: 35, // Align with the arrow
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pokemonImage: {
    width: 60,
    height: 60,
  },
  pokemonInfo: {
    flex: 1,
    marginLeft: 15,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pokemonType: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
  pokemonNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.8,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedText: {
    color: '#FFCC00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  detailsImage: {
    width: 100,
    height: 100,
  },
  detailsText: {
    flex: 1,
    marginLeft: 15,
  },
  detailsName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  detailsType: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  detailsNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PokedexList;