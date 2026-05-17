import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '../context/ThemeContext';
import { toggleSavedBuild } from '../redux/savedBuildsSlice';
import { fetchBuilds } from '../api/buildsApi';

const FILTERS = {
  TRENDING: 'Trending',
  NEW: 'New',
  TOP_RATED: 'Top Rated',
};

const games = [
  {
    id: 1,
    title: 'Elden Ring',
    genre: 'RPG',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Diablo IV',
    genre: 'ARPG',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Warframe',
    genre: 'Shooter',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Path of Exile',
    genre: 'ARPG',
    image:
      'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Destiny 2',
    genre: 'FPS',
    image:
      'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Valorant',
    genre: 'FPS',
    image:
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=400&auto=format&fit=crop',
  },
];

const fallbackImage =
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop';

function normalizeBuild(build, index) {
  const statuses = [FILTERS.TRENDING, FILTERS.NEW, FILTERS.TOP_RATED];

  return {
    id: build.id || String(index + 1),

    title: build.title || build.name || 'Untitled Build',
    image: build.image || build.imageUrl || build.avatar || fallbackImage,

    game: build.game || 'Unknown Game',
    className: build.className || build.class || 'Custom Class',
    author: build.author || build.creator || 'Unknown Creator',

    likes: Number(build.likes) || 0,
    views: Number(build.views) || 0,

    status: build.status || build.filter || statuses[index % statuses.length],

    tags: build.tags || 'Starter, Balanced, Flexible',
    skills: build.skills || 'Main Skill, Utility Skill, Burst Skill, Mobility',
    items: build.items || 'Weapon, Armor, Consumable, Upgrade',
    talismans:
      build.talismans || build.mods || 'Damage Boost, Defense, Speed, Recovery',

    description:
      build.description ||
      'This build is designed for comfortable gameplay, stable damage, and flexible progression.',

    subtitle:
      build.subtitle ||
      `${build.game || 'Unknown Game'} · ${
        build.author || build.creator || 'Unknown Creator'
      }`,
  };
}

export default function ExploreScreen({ navigation }) {
  const { colors, gradientColors } = useTheme();
  const dispatch = useDispatch();

  const savedBuilds = useSelector(state => state.savedBuilds.items);

  const [activeFilter, setActiveFilter] = useState(FILTERS.TRENDING);
  const [builds, setBuilds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const styles = createStyles(colors);

  useEffect(() => {
    const loadBuilds = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const data = await fetchBuilds();

        const normalizedBuilds = Array.isArray(data)
          ? data.map((build, index) => normalizeBuild(build, index))
          : [];

        setBuilds(normalizedBuilds);
      } catch (error) {
        setErrorMessage('Failed to load builds. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadBuilds();
  }, []);

  const filteredBuilds = builds.filter(build => build.status === activeFilter);

  const isBuildSaved = buildId => {
    return savedBuilds.some(build => build.id === buildId);
  };

  const openBuildDetails = build => {
  navigation.getParent()?.navigate('BuildDetails', { build });
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Explore</Text>

      <Pressable onPress={() => {}} style={styles.searchBox}>
        <Text style={styles.searchText}>Search builds, guides, games</Text>
      </Pressable>

      <View style={styles.filters}>
        {Object.values(FILTERS).map(filter => {
          const isActive = activeFilter === filter;

          if (isActive) {
            return (
              <Pressable key={filter} onPress={() => setActiveFilter(filter)}>
                <LinearGradient
                  colors={gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.activeFilter}
                >
                  <Text style={styles.activeFilterText}>{filter}</Text>
                </LinearGradient>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={styles.filter}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Browse by Game</Text>

      <View style={styles.gameGrid}>
        {games.map(game => (
          <Pressable
            key={game.id}
            onPress={() => {}}
            style={({ pressed }) => [
              styles.gameCard,
              pressed && styles.pressedCard,
            ]}
          >
            <Image source={{ uri: game.image }} style={styles.gameImage} />

            <Text style={styles.gameTitle} numberOfLines={1}>
              {game.title}
            </Text>

            <Text style={styles.gameGenre}>{game.genre}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Builds</Text>
        <Text style={styles.filterLink}>{activeFilter}</Text>
      </View>

      {isLoading && (
        <View style={styles.stateCard}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text style={styles.stateText}>Loading builds...</Text>
        </View>
      )}

      {!isLoading && errorMessage !== '' && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>Something went wrong</Text>
          <Text style={styles.stateText}>{errorMessage}</Text>
        </View>
      )}

      {!isLoading && errorMessage === '' && filteredBuilds.length === 0 && (
        <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>No builds found</Text>
          <Text style={styles.stateText}>
            There are no builds for this filter yet.
          </Text>
        </View>
      )}

      {!isLoading &&
        errorMessage === '' &&
        filteredBuilds.map(build => {
          const saved = isBuildSaved(build.id);

          return (
            <Pressable
              key={build.id}
              onPress={() => openBuildDetails(build)}
              style={({ pressed }) => [
                styles.buildCard,
                pressed && styles.pressedCard,
              ]}
            >
              <Image source={{ uri: build.image }} style={styles.buildImage} />

              <View style={styles.buildContent}>
                <Text style={styles.buildTitle}>{build.title}</Text>
                <Text style={styles.buildSubtitle}>
                  {build.game} · {build.author}
                </Text>

                <Text style={styles.buildStats}>
                  ♡ {build.likes.toLocaleString()}   ◉{' '}
                  {build.views.toLocaleString()}
                </Text>
              </View>

              <Pressable
                onPress={event => {
                  event.stopPropagation();
                  dispatch(toggleSavedBuild(build));
                }}
                style={({ pressed }) => [
                  styles.saveButton,
                  saved && styles.savedButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Text
                  style={[
                    styles.saveButtonText,
                    saved && styles.savedButtonText,
                  ]}
                >
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </Pressable>
            </Pressable>
          );
        })}
    </ScrollView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingTop: 44,
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    title: {
      color: colors.text,
      fontSize: 34,
      fontWeight: '600',
      marginBottom: 28,
    },
    searchBox: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.cardAlt,
      borderRadius: 18,
      paddingVertical: 18,
      paddingHorizontal: 18,
      marginBottom: 24,
    },
    searchText: {
      color: colors.muted,
      fontSize: 16,
    },
    filters: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 30,
    },
    activeFilter: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    activeFilterText: {
      color: '#080A18',
      fontWeight: '700',
      fontSize: 15,
    },
    filter: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.cardAlt,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    filterText: {
      color: colors.muted,
      fontWeight: '600',
      fontSize: 15,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 18,
    },
    gameGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 34,
    },
    gameCard: {
      width: '31%',
      minHeight: 148,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    pressedCard: {
      opacity: 0.72,
      transform: [{ scale: 0.98 }],
    },
    pressedButton: {
      opacity: 0.72,
      transform: [{ scale: 0.96 }],
    },
    gameImage: {
      width: 56,
      height: 56,
      borderRadius: 16,
      marginBottom: 12,
    },
    gameTitle: {
      color: colors.text,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 8,
    },
    gameGenre: {
      color: colors.muted,
      fontSize: 13,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterLink: {
      color: colors.accent,
      fontSize: 16,
      marginBottom: 18,
    },
    stateCard: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      marginBottom: 14,
      gap: 8,
    },
    stateTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '600',
    },
    stateText: {
      color: colors.muted,
      fontSize: 14,
    },
    buildCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 14,
      marginBottom: 14,
    },
    buildImage: {
      width: 68,
      height: 68,
      borderRadius: 14,
    },
    buildContent: {
      flex: 1,
    },
    buildTitle: {
      color: colors.text,
      fontSize: 17,
      marginBottom: 6,
    },
    buildSubtitle: {
      color: colors.muted,
      fontSize: 14,
      marginBottom: 6,
    },
    buildStats: {
      color: colors.muted,
      fontSize: 13,
    },
    saveButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: colors.cardAlt,
    },
    savedButton: {
      borderColor: colors.accent,
      backgroundColor: colors.cardAlt,
    },
    saveButtonText: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '600',
    },
    savedButtonText: {
      color: colors.accent,
    },
  });
}