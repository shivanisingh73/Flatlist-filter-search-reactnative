import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import {createStackNavigator} from 'react-navigation';
import Login from './Login';
import List from './List';
import Filter from './Filter';
import FilterScreen from './FilterScreen';
import Link from './Link';
import Drawer from './Drawer';

const App = createStackNavigator({
  login:{
    screen: Login
  },
  list : {
    screen : List
  },
  filter:{
    screen: Filter
  },
    filterScreen:{
    screen: FilterScreen
  },
  link:{
    screen: Link
  },
  drawer:
  {
    screen: Drawer
  }
});

export default App;