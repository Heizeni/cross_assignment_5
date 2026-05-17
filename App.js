import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}