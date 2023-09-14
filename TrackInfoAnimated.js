import React from 'react';
import SingFyClient from './SingFyClient';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Button,
  Pressable,
} from 'react-native';

import SoundPlayer from 'react-native-sound-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import TrackInfoPlayList from './TrackInfoPlayList';

//import AsyncStorage from 'react-native-async-storage/async-storage';




export default class TrackInfoAnimated extends React.Component {

//apiClient = new SingFyClient();

constructor(props){
  super(props);

         /*
         //si tengo el this.track de abajo no necesito estado y viceversa
          this.state = {
              track: props.route.params.track,
          }
          */

  this.apiClient = new SingFyClient();
  this.track = props.route.params.track

  this.imagenOpacity = new Animated.Value(0);
  this.titleScale = new Animated.Value(0.5);

  

// props.navigation.setOptions({
//     title: 'InfoAnimated'
// });

//la animacion va a hacer que la opacidad pase de 0 a 1 en el tiempo que le digamos
Animated.timing(this.imagenOpacity, {
  toValue: 1,
  duration: 3000,
  delay: 1000,
  useNativeDriver: true,
}).start();

//parallel para hacer varias a la vez, o sequence para hacer primero uno y luego otra, hay otros tipos como loop en bucle, stagger etc
Animated.parallel([ 
  //este afecta al head igual que el animated de abajo, diferentes ejemplos
 Animated.timing(this.titleScale, {
     toValue: 1,
     duration: 3000,
     delay: 4000,
     useNativeDriver: true,
 }),
 //.start();   si solo usara(no es paralelo) una hago el start sobre la individual 
 
 //también hay usando friction y tension
 //mass y stiffness, damping, etc, usaré estos como prueba
 
 Animated.spring(this.titleScale, {
     toValue: 1,
     speed: 0.1,
     bounciness: 10,
     useNativeDriver: true,
 }),
]).start();


}

//async
componentDidMount(){
  this.props.navigation.setOptions({
      title: this.track.name, //this.state.track.name
  })

  //const track = await this.apiClient.getTrackDetails(this.state.track.id)
  /*
  alert(JSON.stringify(track));
  this.setState({
      track: this.track,
  })
  */
}


  render() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
              {this.renderHeader()}
              {this.renderArtist()}
              {this.renderDuration()}
          </View>
        </SafeAreaView>
    );
  }


  renderHeader(){
    const track = this.track;  //si usaramos stado tendríamos que sacarlo del estado

    return (
     <View style={styles.headerContainer}>
        <Animated.Image  //meto el image en animated sino no puedo animarlo
        //estas imagenes son aleatorias, quería meter alguna imagen del disco de la canción pero la bbdd no tiene..
            source= {{uri: 'https://source.unsplash.com/random/?sig=incrementingIdentifier'}} 
            //style={styles.image} si quiero meter solo una propiedad de estilo
            style={[  //si quiero un array de estilos
                styles.image,
                {
                    opacity: this.imagenOpacity,
                },
            ]}
        >
        </Animated.Image>
        <View style={styles.titleContainer}>
            <Animated.Text 
                style={[
                    styles.title,
                    {
                        transform:  [{
                           scale: this.titleScale,
                        },],
                    }
                ]}
                >Name: { track.name}
            </Animated.Text>
            <Text>Popularity: { track.popularity}</Text>
            <Pressable onPress={() => this.onPlayListAdd(track)}>
              <View>
                  <Icon name="ios-heart" size={25} color={'black'} />
              </View>
            </Pressable>
        </View>
    </View>
    );
}

onPlayListAdd = async (track) => {
  //prueba para ver que funciona el press
  //console.log(track.preview_url); 
  //esto funciona con string
//  try {
//   await AsyncStorage.setItem(
//     'trackName',
//     track.name,
//   );
//  } catch (e) {
//      console.log(`cannot add to PlayList AsynStorage¡¡`, e)
//  }
//  try {
//   const value = await AsyncStorage.getItem(
//     'trackName',
//   );
//   console.log(value);
//   alert(value);
//  } catch (e) {
//      console.log(`cannot add to PlayList AsynStorage¡¡`, e)
//  }

//así me guardo el objeto entero, pasandolo a string, primero borro lo que hay, por si ya hubiera uno guardado antes
AsyncStorage.setItem('track', JSON.stringify(track), (err)=> {
  if(err){
      console.log("an error");
      throw err;
  }
  console.log("success");
  //TrackInfoPlayList.getState.setLoading = false;

}).catch((err)=> {
  console.log("error is: " + err);
});

//recibo el objeto parseandolo
try {
  const value = await AsyncStorage.getItem('track');
  if (value !== null) {
      // We have data!!
      //console.log(JSON.parse(value));
      alert(value);
  }
} catch (error) {
  // Error retrieving data
}


// try {
//   await AsyncStorage.setItem("track", JSON.stringify(track));
//  } catch (e) {
//      console.log(`cannot add to PlayList AsynStorage¡¡`, e)
//  }
//  try {
//   const TrackValue = JSON.parse(await AsyncStorage.getItem("track"));
//   console.log(TrackValue.popularity);
//   alert(value.popularity);
//  } catch (e) {
//      console.log(`cannot add to PlayList AsynStorage¡¡`, e)
//  }

 
}

renderArtist(){   //es un objeto voy a mapearlo a ver si consigo sus datos
  //alert(JSON.stringify(this.track.artists)); //aqui si me sale el artista, sus datos

  if(this.track.artists === undefined) {  //por aqui no esta entrando aunque devuelva null
      return null;
  }

  return (
      <View style={styles.artistsContainer}>
          {this.renderArtistList()}
      </View>
      
  );
}

renderArtistList(){
  console.log(this.track.artists); 
  //alert(JSON.stringify(this.track));
  const artists = this.track.artists;
  //alert(JSON.stringify(artists));

  return artists.map((artist) => { //aquí tenía index y abajo key = {artist.id} no se si es necesario
      return (
          <Text style={styles.artist}>{artist.name}</Text>
      );
  });
}

renderDuration() {
  const track = this.track;

  /*
  if(track.duration === undefined){
      return null;
  }
  */

  return (
    // - Duración: {track.duration_ms/60} minutos.   
    // - Duración: {track.duration_ms/60/60} horas.   
    //quería meter una fila de duraciones pero no me están apareciendo como diferentes Text
    //y si lo meto dentro del mismo text queda feo
      <View>
          <Text style={styles.duration}>
              - Duración: {track.duration_ms} segundos.   
          </Text>

      </View>
  );
}


//en el safeArea iría {this.renderGenres()} finalmente no lo utilizo
// renderGenres(){
//   if (this.track.genres === undefined){
//       return null;
//   }

//   return(
//       <View style={styles.genresContainer}>
//           {this.renderGenresList()}
//       </View>
//   );
// }
  

// renderGenreList() {
//   const genres = this.state.track.genres;

//   return genres.map((genre, index) => {
//       return (
//           <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
//       );
//   });
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
  safeAreaContainer:{
    flex: 1,
  },
  container:{
      flex: 1,
      padding: 10,
      //paddingTop: -30,
  },
  headerContainer: {
      flex: 0,
      flexDirection: 'row',
  },
  image: {
      width: 100,
      height: 150,
      borderRadius: 20,
  },
  titleContainer: {
      flex:1,
      justifyContent: 'center',
      paddingLeft: 10,
      marginBottom: 70,
  },
  title:{
      fontSize:20,
      fontWeight: 'bold',
      textShadowColor:'#585858',
      textShadowOffset:{width: 5, height: 5},
      textShadowRadius:10,
  },
  artistsContainer: {
      flex:1,
      paddingLeft: 75,
      flexDirection: 'row',
      alignItems: 'center',
      //flexWrap: 'wrap',  //para ajustar contenido si se pasa del espacio
      marginVertical: 20,
      //padding: 10,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 50,
  },
  artist: {
      backgroundColor: 'black',
      color: 'pink',
      padding: 20,
      //paddingBottom:30, 
      //paddingTop: 10,
      //paddingLeft:10,
      //paddingRight:10,
      //margin: 5,
      marginTop: -450,
      marginLeft: 35,
      fontSize: 20,
      borderWidth: 1,
      borderColor: "pink",
      borderRadius: 50,
  },
  styleContainer: {
      flex: 1,
  },
  duration: {
      fontSize: 20,
      //paddingTop:100,
      marginTop: -325,
      paddingLeft: 10,
      //flexDirection: 'column',
  },
//   durationMinutos: {
//     fontSize: 20,
//     //paddingTop:100,
//     //marginTop: -355,
//     //paddingLeft: 10,
// },
});

