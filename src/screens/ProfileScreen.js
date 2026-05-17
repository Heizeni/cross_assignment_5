import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '../context/ThemeContext';
import { removeSavedBuild } from '../redux/savedBuildsSlice';

const achievements = [
  {
    id: 1,
    title: 'First Build',
    description: 'Create your first build',
    progress: '100%',
  },
  {
    id: 2,
    title: 'Trending Creator',
    description: 'Reach 100 likes',
    progress: '80%',
  },
];

export default function ProfileScreen({ navigation }) {
  const { colors, gradientColors } = useTheme();
  const savedBuilds = useSelector(state => state.savedBuilds.items);
  const dispatch = useDispatch();

  const styles = createStyles(colors);

  const openBuildDetails = build => {
  navigation.getParent()?.navigate('BuildDetails', { build });
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Profile</Text>

        <Pressable
          onPress={() => navigation.navigate('Settings')}
          style={({ pressed }) => [
            styles.settingsButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </Pressable>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop',
          }}
          style={styles.avatar}
        />

        <Text style={styles.username}>ShadowHunter_42</Text>
        <Text style={styles.level}>Level 24</Text>
        <Text style={styles.xp}>XP: 7,200 / 10,000</Text>

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.progressFill}
          />
        </View>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statNumber}>{savedBuilds.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>

          <View>
            <Text style={styles.statNumber}>4,580</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>

          <View>
            <Text style={styles.statNumber}>890</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => pressed && styles.pressedButton}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileButton}
          >
            <Text style={styles.profileButtonText}>Edit profile</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Text style={styles.link}>View all</Text>
      </View>

      {achievements.map(item => (
        <Pressable
          key={item.id}
          onPress={() => {}}
          style={({ pressed }) => [styles.card, pressed && styles.pressedCard]}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.description}</Text>

          <View style={styles.smallProgressTrack}>
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.smallProgressFill, { width: item.progress }]}
            />
          </View>
        </Pressable>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Saved Builds</Text>
        <Text style={styles.link}>{savedBuilds.length} saved</Text>
      </View>

      {savedBuilds.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No saved builds yet</Text>
          <Text style={styles.emptyText}>
            Go to Explore and tap Save on any build.
          </Text>
        </View>
      ) : (
        savedBuilds.map(build => (
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
              <Text style={styles.buildSubtitle}>{build.subtitle}</Text>
            </View>

            <Pressable
              onPress={() => dispatch(removeSavedBuild(build.id))}
              style={({ pressed }) => [
                styles.removeButton,
                pressed && styles.pressedButton,
              ]}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </Pressable>
        ))
      )}
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
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: colors.text,
      fontSize: 34,
      fontWeight: '600',
      marginBottom: 28,
    },
    settingsButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 28,
    },
    pressedButton: {
      opacity: 0.72,
      transform: [{ scale: 0.96 }],
    },
    settingsIcon: {
      color: colors.text,
      fontSize: 20,
    },
    profileCard: {
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 28,
      marginBottom: 34,
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 20,
    },
    username: {
      color: colors.text,
      fontSize: 25,
      fontWeight: '600',
      marginBottom: 14,
    },
    level: {
      color: colors.muted,
      fontSize: 18,
      marginBottom: 14,
    },
    xp: {
      color: colors.muted,
      fontSize: 16,
      marginBottom: 12,
    },
    progressTrack: {
      width: 180,
      height: 10,
      backgroundColor: colors.input,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 28,
    },
    progressFill: {
      width: '72%',
      height: '100%',
      borderRadius: 8,
    },
    statsRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 24,
    },
    statNumber: {
      color: colors.accent,
      fontSize: 24,
      textAlign: 'center',
    },
    statLabel: {
      color: colors.muted,
      marginTop: 8,
      textAlign: 'center',
    },
    profileButton: {
      paddingVertical: 13,
      paddingHorizontal: 36,
      borderRadius: 22,
    },
    profileButtonText: {
      color: '#080A18',
      fontWeight: '700',
      fontSize: 15,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 18,
    },
    link: {
      color: colors.accent,
      fontSize: 16,
      marginBottom: 18,
    },
    card: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 22,
      marginBottom: 16,
    },
    pressedCard: {
      opacity: 0.72,
      transform: [{ scale: 0.98 }],
    },
    cardTitle: {
      color: colors.text,
      fontSize: 21,
      marginBottom: 12,
    },
    cardSubtitle: {
      color: colors.muted,
      fontSize: 16,
      marginBottom: 18,
    },
    smallProgressTrack: {
      height: 9,
      backgroundColor: colors.input,
      borderRadius: 8,
      overflow: 'hidden',
    },
    smallProgressFill: {
      height: '100%',
      borderRadius: 8,
    },
    emptyCard: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 22,
      marginBottom: 16,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 18,
      marginBottom: 8,
    },
    emptyText: {
      color: colors.muted,
      fontSize: 15,
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
      width: 64,
      height: 64,
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
    },
    removeButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: colors.cardAlt,
    },
    removeButtonText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '600',
    },
  });
}