import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import BuildDetailsScreen from '../screens/BuildDetailsScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

const SCREENS = {
  MAIN_TABS: 'MainTabs',
  SETTINGS: 'Settings',
  BUILD_DETAILS: 'BuildDetails',
};

export default function StackNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name={SCREENS.MAIN_TABS} component={TabNavigator} />

      <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />

      <Stack.Screen
        name={SCREENS.BUILD_DETAILS}
        component={BuildDetailsScreen}
      />
    </Stack.Navigator>
  );
}