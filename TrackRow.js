import React from 'react';

import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


export class TrackRow extends React.Component
{
    render(){
        const { name } = this.props;

        return(
          <TouchableHighlight onPress={this.props.onPress} underlayColor={'gray'} >
              <View style={styles.container}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTrack}>Name: {name}</Text>
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    nameContainer: {
      flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  
    },
    nameTrack: {
      fontSize: 15,
      marginBottom: 5,
      color: 'black',
    },
    image: {
      width: 100,
      height: 100,
    },
    
  });

  export default TrackRow;
