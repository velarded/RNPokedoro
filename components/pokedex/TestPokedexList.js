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
  const scrollContainerHeight = height * 0.5;
  
  // Calculate the center position for the selector
  const centerPosition = (scrollContainerHeight - itemSize) / 2;

  // Set initial scroll position when component mounts
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scrollViewRef.current) {
        const initialScrollY = (selectedId - 1) * itemSize;
        scrollViewRef.current.scrollTo({
          y: initialScrollY,
          animated: false
        });
        // Set the scrollY value manually for animations
        scrollY.setValue(initialScrollY);
      }
    }, 150);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Scroll to selected item when selection changes
  const scrollToSelected = (id) => {
    if (scrollViewRef.current) {
      const targetY = (id - 1) * itemSize;
      scrollViewRef.current.scrollTo({
        y: targetY,
        animated: true
      });
    }
  };

  // Handle scroll events
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Handle scroll end to update selection
  const handleScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemSize);
    const newSelectedId = Math.min(Math.max(1, index + 1), POKEMON_DATA.length);
    
    if (newSelectedId !== selectedId) {
      setSelectedId(newSelectedId);
    }
  };

  return (
    <View style={styles.container}>
      
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
          <View style={[styles.scrollContainer,]}>
            <Animated.ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={itemSize}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleScrollEnd}
              onScrollEndDrag={handleScrollEnd}
              contentContainerStyle={{
                top: 78.5 - 40
              }}
            >
              {POKEMON_DATA.map((pokemon, index) => {
                const itemPosition = index * itemSize;
                
                const inputRange = [
                  itemPosition - itemSize * 2,
                  itemPosition - itemSize,
                  itemPosition,
                  itemPosition + itemSize,
                  itemPosition + itemSize * 2,
                ];
                
                const scale = scrollY.interpolate({
                  inputRange,
                  outputRange: [0.7, 0.85, 1, 0.85, 0.7],
                  extrapolate: 'clamp',
                });
                
                const opacity = scrollY.interpolate({
                  inputRange,
                  outputRange: [0.4, 0.7, 1, 0.7, 0.4],
                  extrapolate: 'clamp',
                });
                
                const isSelected = pokemon.id === selectedId;
                
                return (
                  <TouchableOpacity 
                    key={pokemon.id}
                    onPress={() => {
                      setSelectedId(pokemon.id);
                      scrollToSelected(pokemon.id);
                    }}
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
                        shadowOpacity: isSelected ? 0.4 : 0.2,
                        zIndex: isSelected ? 1 : 0,
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
                      
                      {/* Debug indicator - shows when item is at center */}
                      {isSelected && (
                        <View style={styles.centerIndicator} />
                      )}
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </Animated.ScrollView>
          </View>
        </View>
      </View>
      
      {/* Selected Pokemon details */}
      {/* <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.selectedText}>
            SELECTED: {POKEMON_DATA.find(p => p.id === selectedId)?.name}
          </Text>
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
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
    height: height * 0.5,
  },
  whiteArrowContainer: {
    width: 10,
    alignItems: 'center',
    top: 78.5,
    height: '100%',
  },
  whiteArrow: {
    width: 0,
    height: 0,
    top: -10,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'maroon',
    transform: [{ rotate: '90deg' }],
  },
  listContainer: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  scrollContainer: {
    width: '100%',
    // height: '100%',
    backgroundColor: 'lavender'
  },
  rulerContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    left: -35,
    right: 0,
    top: 78.5, // This centers the ruler vertically in the container
    zIndex: 10,
    alignItems: 'flex-start',
    pointerEvents: 'none',
  },
  rulerLine: {
    width: '105%', // Extend slightly beyond the list
    height: 3,
    backgroundColor: '#FFCC00',
    marginLeft: 35,
    shadowColor: '#FFCC00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  rulerCenter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFCC00',
    position: 'absolute',
    left: 35,
    shadowColor: '#FFCC00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
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
  centerIndicator: {
    position: 'absolute',
    right: 5,
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginTop: -4,
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