/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import googlelogin from './src/screens/Authflow/Login/googlelogin';
AppRegistry.registerComponent(appName, () => googlelogin);
