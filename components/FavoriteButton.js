import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import linedHeart from "../assets/icons/heart/heart-line-black.png";
import filledHeart from "../assets/icons/heart/heart-filled-black.png";

const FavoriteButton = ({isFavorite, handleOnPressFav}) => {
  return (
       isFavorite ?
       <TouchableOpacity onPress={handleOnPressFav}>
          <Image
          style={styles.favIcon}
          source={filledHeart}
        />
        </TouchableOpacity> : <TouchableOpacity onPress={handleOnPressFav}>
          <Image
            style={styles.favIcon}
            source={linedHeart}
          />
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favIcon: {
    width: 35,
    height: 35,
  },

});

export default FavoriteButton;