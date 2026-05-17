import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ACCENT_OPTIONS, THEMES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen({ navigation }) {
  const { theme, accent, colors, gradientColors, toggleTheme, changeAccent } =
    useTheme();

  const isDarkTheme = theme === THEMES.DARK;
  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <Text style={styles.title}>Settings</Text>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Username</Text>

          <View style={styles.input}>
            <Text style={styles.inputText}>ShadowHunter_42</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Appearance</Text>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Dark theme</Text>
            <Text style={styles.settingSubtitle}>
              Current theme: {isDarkTheme ? 'Dark' : 'Light'}
            </Text>
          </View>

          <Pressable onPress={toggleTheme}>
            {isDarkTheme ? (
              <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.switchOn}
              >
                <View style={styles.switchCircleOn} />
              </LinearGradient>
            ) : (
              <View style={styles.switchOff}>
                <View style={styles.switchCircle} />
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.divider} />

        <Text style={styles.mutedLabel}>Accent color</Text>

        <View style={styles.colorGrid}>
          {ACCENT_OPTIONS.map(option => {
            const isSelected = accent === option.id;

            return (
              <Pressable
                key={option.id}
                onPress={() => changeAccent(option.id)}
                style={[
                  styles.colorButton,
                  isSelected && styles.selectedColor,
                ]}
              >
                <LinearGradient
                  colors={option.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.colorDot}
                />

                <Text style={styles.colorText}>{option.label}</Text>

                {isSelected && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Notifications</Text>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Push notifications</Text>
            <Text style={styles.settingSubtitle}>
              Likes, comments, and updates
            </Text>
          </View>

          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.switchOn}
          >
            <View style={styles.switchCircleOn} />
          </LinearGradient>
        </View>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Sound effects</Text>
            <Text style={styles.settingSubtitle}>Static placeholder switch</Text>
          </View>

          <View style={styles.switchOff}>
            <View style={styles.switchCircle} />
          </View>
        </View>
      </View>

      <Pressable onPress={() => {}} style={styles.resetButton}>
        <Text style={styles.resetText}>↻ Reset to defaults</Text>
      </Pressable>
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
      paddingHorizontal: 18,
      paddingBottom: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 28,
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    pressedButton: {
      opacity: 0.72,
      transform: [{ scale: 0.96 }],
    },
    backIcon: {
      color: colors.text,
      fontSize: 24,
      lineHeight: 26,
    },
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '600',
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 14,
      marginTop: 10,
    },
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 18,
      padding: 16,
      marginBottom: 22,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      color: colors.text,
      fontSize: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 14,
      minWidth: 175,
    },
    inputText: {
      color: colors.text,
      fontSize: 14,
    },
    mutedLabel: {
      color: colors.muted,
      fontSize: 14,
      marginBottom: 16,
    },
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    colorButton: {
      width: '48%',
      minHeight: 46,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    selectedColor: {
      borderColor: colors.accent,
      backgroundColor: colors.cardAlt,
    },
    colorDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 10,
    },
    colorText: {
      color: colors.text,
      fontSize: 13,
      flex: 1,
    },
    check: {
      color: colors.accent,
      fontSize: 14,
      fontWeight: '700',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 58,
    },
    settingTitle: {
      color: colors.text,
      fontSize: 16,
      marginBottom: 4,
    },
    settingSubtitle: {
      color: colors.muted,
      fontSize: 13,
    },
    switchOff: {
      width: 50,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.switch,
      justifyContent: 'center',
      paddingHorizontal: 4,
    },
    switchCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.text,
    },
    switchOn: {
      width: 50,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 4,
    },
    switchCircleOn: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
    },
    resetButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 4,
    },
    resetText: {
      color: colors.muted,
      fontSize: 15,
    },
  });
}