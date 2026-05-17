import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '../context/ThemeContext';
import { toggleSavedBuild } from '../redux/savedBuildsSlice';

const splitTextToArray = value => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return value.split(',').map(item => item.trim());
};

export default function BuildDetailsScreen({ route, navigation }) {
  const { colors, gradientColors } = useTheme();
  const dispatch = useDispatch();

  const savedBuilds = useSelector(state => state.savedBuilds.items);

  const build = route.params?.build;

  const styles = createStyles(colors);

  if (!build) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Text style={styles.iconText}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Build not found</Text>
          <Text style={styles.description}>
            Build data was not passed to this screen.
          </Text>
        </View>
      </View>
    );
  }

  const tags = splitTextToArray(build.tags);
  const skills = splitTextToArray(build.skills);
  const items = splitTextToArray(build.items);
  const talismans = splitTextToArray(build.talismans);

  const isSaved = savedBuilds.some(item => item.id === build.id);

  const handleSaveBuild = () => {
    dispatch(toggleSavedBuild(build));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.iconText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Build Details</Text>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.shareText}>⌯</Text>
        </Pressable>
      </View>

      <View style={styles.heroCard}>
        <Image source={{ uri: build.image }} style={styles.heroImage} />

        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{build.title}</Text>
        </View>
      </View>

      <Text style={styles.title}>{build.title}</Text>

      <Text style={styles.meta}>
        {build.game} · {build.className} · by {build.author}
      </Text>

      <View style={styles.statsRow}>
        <Text style={styles.stat}>
          ♡ {Number(build.likes || 0).toLocaleString()}
        </Text>

        <Text style={styles.stat}>
          ◉ {Number(build.views || 0).toLocaleString()}
        </Text>
      </View>

      <View style={styles.tagsRow}>
        {tags.map((tag, index) => (
          <View key={`${tag}-${index}`} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{build.description}</Text>
      </View>

      <BuildSection title="Skills" items={skills} icon="ϟ" styles={styles} />
      <BuildSection title="Items" items={items} icon="†" styles={styles} />
      <BuildSection
        title="Mods / Talismans"
        items={talismans}
        icon="▱"
        styles={styles}
      />

      <View style={styles.buttonsRow}>
        <Pressable
          onPress={handleSaveBuild}
          style={({ pressed }) => [
            styles.secondaryButton,
            isSaved && styles.savedButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              isSaved && styles.savedButtonText,
            ]}
          >
            {isSaved ? 'Saved' : 'Save Build'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => pressed && styles.pressedButton}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.likeButton}
          >
            <Text style={styles.likeIcon}>♥</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function BuildSection({ title, items = [], icon, styles }) {
  const displayedItems = Array.isArray(items) ? [...items] : [];

  while (displayedItems.length < 4) {
    displayedItems.push('Empty');
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.grid}>
        {displayedItems.slice(0, 4).map((item, index) => {
          const isEmpty = item === 'Empty';

          return (
            <View
              key={`${item}-${index}`}
              style={[styles.slotCard, isEmpty && styles.emptySlotCard]}
            >
              <Text style={[styles.slotIcon, isEmpty && styles.emptyText]}>
                {icon}
              </Text>

              <Text style={[styles.slotText, isEmpty && styles.emptyText]}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 120,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 26,
    },
    iconButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pressedButton: {
      opacity: 0.72,
      transform: [{ scale: 0.96 }],
    },
    iconText: {
      color: colors.text,
      fontSize: 42,
      lineHeight: 42,
    },
    shareText: {
      color: colors.muted,
      fontSize: 28,
    },
    headerTitle: {
      flex: 1,
      color: colors.text,
      fontSize: 28,
      fontWeight: '600',
      marginLeft: 8,
    },
    heroCard: {
      height: 180,
      borderRadius: 22,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 28,
      backgroundColor: colors.card,
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    heroTitle: {
      color: '#F4F4FF',
      fontSize: 20,
      fontWeight: '600',
    },
    title: {
      color: colors.text,
      fontSize: 34,
      fontWeight: '600',
      marginBottom: 12,
    },
    meta: {
      color: colors.muted,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 20,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 18,
      marginBottom: 24,
    },
    stat: {
      color: colors.muted,
      fontSize: 18,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 28,
    },
    tag: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.cardAlt,
    },
    tagText: {
      color: colors.muted,
      fontSize: 16,
      fontWeight: '600',
    },
    descriptionBox: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      padding: 20,
      marginBottom: 30,
    },
    description: {
      color: colors.muted,
      fontSize: 18,
      lineHeight: 30,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '600',
      marginBottom: 18,
    },
    grid: {
      flexDirection: 'row',
      gap: 14,
    },
    slotCard: {
      flex: 1,
      minHeight: 112,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.accent,
      backgroundColor: colors.cardAlt,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    emptySlotCard: {
      borderStyle: 'dashed',
      borderColor: colors.border,
      backgroundColor: colors.input,
    },
    slotIcon: {
      color: colors.text,
      fontSize: 28,
      marginBottom: 10,
    },
    slotText: {
      color: colors.text,
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
      fontWeight: '600',
    },
    emptyText: {
      color: colors.muted,
    },
    buttonsRow: {
      flexDirection: 'row',
      gap: 14,
      marginTop: 18,
    },
    secondaryButton: {
      flex: 1,
      height: 62,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.text,
      justifyContent: 'center',
      alignItems: 'center',
    },
    savedButton: {
      borderColor: colors.accent,
      backgroundColor: colors.cardAlt,
    },
    secondaryButtonText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '600',
    },
    savedButtonText: {
      color: colors.accent,
    },
    likeButton: {
      width: 62,
      height: 62,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    likeIcon: {
      color: '#080A18',
      fontSize: 26,
      fontWeight: '700',
    },
  });
}