/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigation);
