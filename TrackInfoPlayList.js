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

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'


export default class TrackInfoPlayList extends React.Component {

//apiClient = new SingFyClient();
//nextPage = 1;

constructor(){
  super();

  this.apiClient = new SingFyClient();
  //const track = '';
  
  this.state = {
    track: [],   // [] ¿?
    loading: false,
  }

  //quiero obtener el track guardado en AsyncStorage
  //this.recuperarTrack();
  //this.track = this.onPlayListAdd();
  //console.log(this.track);
  //console.log(JSON.parse(this.track)); //ya es un objeto, no hace falta parsearlo
  //this.track = JSON.stringify(this.track); //intento pasarlo antes a texto
  //console.log(this.track);
  //alert(this.track); //objecto, quiero en texto no como objeto

  //this.track = props.route.params.track

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
  // this.props.navigation.setOptions({
  //     title: this.track.name, //this.state.track.name
  // })
  
  //const track = await this.apiClient.getTrackDetails(this.state.track.id)
  /*
  alert(JSON.stringify(track));
  this.setState({
      track: this.track,
  })
  */
}

loadNextPage = async () => {

  if(this.state.loading){
    return;
  }
  //alert(this.state.loading); la primera sale falso, sino no entraria aquí
  //this.setState({loading: true});
  const resultTrack = await this.onPlayListAdd();  //obtengo los datos del track
  //alert(resultTrack);
  
  //const track = this.nextPage === 1 ? resultTrack : [...this.state.track, ...resultTrack] //esto es correcto?
  //const tracks = this.nextPage === 1 ? [resultTrack] : [...this.state.tracks, resultTrack]
  //this.setState({ tracks: tracks, loading: false})

  //this.nextPage++;

  this.setState({
    track: resultTrack,  
    loading: true,  
  });
  //alert(this.state.loading);  //true

};

onPullToRefresh = () => {
  if(this.state.loading){
    return;
  }
  //this.nextPage = 1;

  // this.setState({ 
  //   loading: true,  
  // });
  //alert(this.state.loading); 
  this.loadNextPage();
};

// async recuperarTrack() {
//   this.track = await this.onPlayListAdd();
//   //alert(this.track); //objeto objeto
//   this.track = JSON.stringify(this.track); //intento pasarlo antes a texto
//   //alert(this.track); //llegan los datos en Json strings
//   //this.track = JSON.parse(this.track);
//   //alert(this.track);  //objeto objeto
//   //return JSON.parse(this.track);
//   //return this.track;
// }

onPlayListAdd = async () => {
  try {
    const value = await AsyncStorage.getItem('track');
    if (value !== null) {
        //console.log(JSON.parse(value));
        //alert(value);  //lee el objeto en string correcto

        //this.track = JSON.parse(value);
        //this.track = JSON.stringify(value);
        //alert(this.track);  //lee el objeto pero en string correcto
        return JSON.parse(value);
        //return this.track;

    }
  } catch (error) {
  }
  //alert(this.track); //este lo lee bien como formato strings el utlimo que guarde
  //alert(JSON.parse(this.track));
  //return JSON.parse(this.track);
  //return this.track;
}



  render() {
    return (
      //    return <button onClick={() => window.location.reload()}>Refresh</button>;

        <SafeAreaView style={styles.safeAreaContainer} 
        onEndReached={this.loadNextPage()} 
        refreshing={this.state.loading} 
        onRefresh={this.onPullToRefresh()}
        >
          <View style={styles.container}>
              {this.renderHeader()}
              {this.renderArtist()}
              {this.renderDuration()}
          </View>
        </SafeAreaView>
    );
  }


  renderHeader(){
    const track = this.state.track;  //si usaramos stado tendríamos que sacarlo del estado
    //alert(this.track);  //indefinido, no estoy pasando bien la avriable
    return (
     <View style={styles.headerContainer} >
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
                >Name: {track.name}
            </Animated.Text>
            <Text>Popularity: {track.popularity}</Text>
        </View>
    </View>
    );
}


renderArtist(){   //es un objeto voy a mapearlo a ver si consigo sus datos
  //alert(JSON.stringify(this.track.artists)); //aqui si me sale el artista, sus datos

  if(this.state.track.artists === undefined) {  //por aqui no esta entrando aunque devuelva null
      return null;
  }

  return (
      <View style={styles.artistsContainer}>
          {this.renderArtistList()}
      </View>
      
  );
}

renderArtistList(){
  //console.log(this.state.track.artists); 
  //alert(JSON.stringify(this.track));
  const artists = this.state.track.artists;
  //alert(JSON.stringify(artists));

  return artists.map((artist) => { //aquí tenía index y abajo key = {artist.id} no se si es necesario
      return (
          <Text style={styles.artist}>{artist.name}</Text>
      );
  });
}

renderDuration() {
  const track = this.state.track;

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

