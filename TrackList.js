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
    //artists: [],
    //loading: false,
  };
}

// async getTracks() {
//   return [];
// }

  async componentDidMount() {
    // const result = await this.apiClient.getTracks();

    // this.setState({
    //         tracks: result.resultTracks,
    //         //loading: false,
    //       });  
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
      //loading: false,
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
    }else{
      //alert(item.track.name); llega perfectamente
      //return <Text style={styles.track}>{item.track.name}</Text>;
      
      return (
      <TrackRow
        name={item.track.name} 
        onPress={() => this.onTrackRowAudioPress(item.track)} //podía pasarle solo el item pero luego tendría que hacer track.track.name en detail
      />
      )
    }
  }

  onTrackRowAudioPress = async (track) => {
     //prueba para ver que funciona el press
     console.log(track.preview_url); 

     //Probando con SoundPlayer, el unico que me ha funcionado
     //https://www.npmjs.com/package/react-native-sound-player
     //web de donde la he sacado
    try {
      // play the file mp3 esto no me funciona, da igual e spor probar, yo quiero url como abajo
      //play1234 = SoundPlayer.loadSoundFile('./1234.mp3', 'mp3');
      //SoundPlayer.playSoundFile('./1234.mp3', 'mp3')
      //esto es como se me ha ocurrido parar parar y tocar las canciones segun cual suena:
      if(isPlaying == false){ //si no suena ninguna, hace play y guarda los datos, le digo que el isPalyng ya es true y guardo el nombre
      SoundPlayer.loadUrl(track.preview_url);
      SoundPlayer.playUrl(track.preview_url);
      isPlaying=true;
      newSongName=track.name;
      }else if(isPlaying == true && track.name == newSongName){  //si ya esta sonando y es la misma cancion, la paro y ya, el nombre de la cancion es null
        SoundPlayer.stop();
        isPlaying = false;
        newSongName = null;
      }else if(isPlaying == true && track.name != newSongName){ //si esta sonando y le toco en otra cancion, la paro reproduczo la nueva y le digo que si esta tocando y le guardo el nombre de la nueva
        SoundPlayer.stop();
        SoundPlayer.loadUrl(track.preview_url);
        SoundPlayer.playUrl(track.preview_url);
        isPlaying=true;
        newSongName=track.name;
      }
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }

     //Probando con libreria expo-av
    //const playbackObj = new Audio.Sound();
    //await playbackObj.loadAsync({uri: track.preview_url}, {shouldPlay: true});
    // // //await delante de la constante playback o playAsync
    //await playbackObj.playAsync({uri: track.preview_url}, {shouldPlay: true});

  
    // playingAudio = new Audio.Sound();
    // try {
    //   await playingAudio.loadAsync(
    //     { uri: './1234.mp3' },
    //     { shouldPlay: true },
    //   );
    //   await playingAudio.playAsync(
    //     { uri: './1234.mp3' },
    //     { shouldPlay: true },
    //   );
    // } catch (error) {
    //   alert(error.message);
    // }



    //Probando con Sound de react-native
    // const sound = new Sound(track.preview_url, '', error => {
    //   if (error) {
    //     Alert.alert('error', error.message);
    //   }
    // })

    // sound.play(() => {
    //   sound.release();
    // });

    // return () => {
    //   sound.play();
    // };

  
  
}

  
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

