import React from 'react';

import SingFyClient from './SingFyClient';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { TrackRow } from './TrackRow';

import {Audio} from "expo-av";
import Sound from 'react-native-sound';

import SoundPlayer from 'react-native-sound-player'





export default class TrackList extends React.Component {

//apiClient = new SingFyClient();

constructor(props){
  super(props);
  this.apiClient = new SingFyClient();
  this.page = 1;
  this.state = {
    tracks: [],
  };
}

  async componentDidMount() {
    this.loadPage()
  }


loadPage = async () => {
  const result = await this.apiClient.getTracks();
  let tracks = this.state.tracks
  if(this.page === 1){
    tracks= result.resultTracks
  }else{
    tracks = tracks.concat(result.resultTracks)
  }
    this.setState({
      tracks: tracks,
    })  
}



  render() {
    const {tracks} = this.state
    isPlaying = false;
    newSongName = null;

    return (
      //<SafeAreaView style={styles.container}>
        <FlatList 
          data={tracks} 
          renderItem={this.renderTrack}>
       </FlatList>
      //</SafeAreaView>
      
    )
  }

  renderTrack = ({item}) => {
    // console.log(item.track.name);
    // alert(item.track.name);  
     
    if(item.track === null){
      return null;   //mejorar, si una da null que pase a la siguiente
    }else if(item.track.popularity >= 72){
    //   alert(item.track.popularity);
    //  console.log(item.track.popularity);
      //alert(item.track.name); llega perfectamente
      //alert(item.track.popularity);
      return (
      <TrackRow
        name={item.track.name} 
        onPress={() => {
          this.props.navigation.navigate('TrackInfoAnimated',{track: item.track});
      }}
        //onPress={() => this.onTrackPressedInfoAnimated.bind(this, item.track)} 
      />
      
      )
    }
  }

  // onTrackPressedInfoAnimated(track)
  // {
  //   this.props.navigation.navigate('TrackInfoAnimated', { track: track });
  // }
  

//   onTrackRowAudioPress = async (track) => {
//     try {
//       if(isPlaying == false){ //si no suena ninguna, hace play y guarda los datos, le digo que el isPalyng ya es true y guardo el nombre
//       SoundPlayer.loadUrl(track.preview_url);
//       SoundPlayer.playUrl(track.preview_url);
//       isPlaying=true;
//       newSongName=track.name;
//       }else if(isPlaying == true && track.name == newSongName){  //si ya esta sonando y es la misma cancion, la paro y ya, el nombre de la cancion es null
//         SoundPlayer.stop();
//         isPlaying = false;
//         newSongName = null;
//       }else if(isPlaying == true && track.name != newSongName){ //si esta sonando y le toco en otra cancion, la paro reproduczo la nueva y le digo que si esta tocando y le guardo el nombre de la nueva
//         SoundPlayer.stop();
//         SoundPlayer.loadUrl(track.preview_url);
//         SoundPlayer.playUrl(track.preview_url);
//         isPlaying=true;
//         newSongName=track.name;
//       }
//     } catch (e) {
//         console.log(`cannot play the sound file`, e)
//     }
// }

  
  }





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,

  },
  track: {
    padding: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
});

