/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import TrackList from './TrackList';
import PopularTrackList from './PopularTrackList';
import TrackInfoAnimated from './TrackInfoAnimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler';
import TrackInfoPlayList from './TrackInfoPlayList';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const GeneralTracksStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="GeneralTracksStack" component={TrackList} />
  </Stack.Navigator>
);

const PopularStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="Top5" component={PopularTrackList} />
      <Stack.Screen name="TrackInfoAnimated" component={TrackInfoAnimated} />
  </Stack.Navigator>
);

const TrackDetailStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="TrackDetail" component={TrackList} />
  </Stack.Navigator>
);

const PlaylistStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="PlayList" component={TrackInfoPlayList} />
  </Stack.Navigator>
);


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen 
          name="generalTracks" 
          component={GeneralTracksStack} 
          options={{
            tabBarLabel:'General Tracks',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-heart" size={size} color={color} />
              ),
          }}
          />
      <Tab.Screen 
        name="PopularTracks" 
        component={PopularStack} 
        options={{
          tabBarLabel:'Popular Track',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="trophy-outline" size={size} color={color} />
            ),
      }}
      />
      <Tab.Screen 
        name="TrackDetail" 
        component={TrackDetailStack} 
        options={{
          tabBarLabel:'Track Detail',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-heart" size={size} color={color} />
            ),
      }}
      />
      <Tab.Screen 
        name="Playlist" 
        component={PlaylistStack} 
        options={{
          tabBarLabel:'Playlist',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-heart" size={size} color={color} />
            ),
      }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  movieList: {
    flex:1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default App;
