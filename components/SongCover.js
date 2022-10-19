import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FavoriteButton from './FavoriteButton';

const SongCover = ({song, isFavorite, handleOnPressFav, index}) => {
 
  return (
    <View style={styles.box}>
     <Image
        style={styles.songCover}
        source={{
          uri: song?.cover,
        }}
      />
      <View style={styles.songDesc}>
        <Text style={styles.songName}>{song?.title}</Text>
        <FavoriteButton isFavorite={isFavorite} handleOnPressFav={()=>handleOnPressFav(index)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
 
  songName : {
    fontSize: 18,
  },
  songDesc:{
    position: "relative",
    backgroundColor: 'white',
    paddingVertical: 15,
    flexDirection: 'row',
    width: "100%",
    paddingHorizontal : 10,
    justifyContent: "space-between",
    alignItems:"center"

  },
  songCover: {
    width: '100%',
    height : 200,
  }
});

export default SongCover;