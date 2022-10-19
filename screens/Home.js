import React , {useState, useCallback, useEffect, useContext} from 'react';
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import SongCover from "../components/SongCover";
import { AppContext } from '../store/AppContext';
import {SONGS_DATA} from "../api/urls"
const Home = ({navigation}) => {
const [SongsData, setSongsData] = useState([]);
const [favSong, setFavSong] = useContext(AppContext);

const handleFetchSongs = useCallback(async () => {
  const response = await fetch(SONGS_DATA);
  if (response.ok) {
    const songs = await response.json();
    setSongsData(songs.data);
  }
}, []);

useEffect(() => {
  handleFetchSongs();
}, []);
    const onSongPress = (song, index) => {
        navigation.navigate('Song', {
            song : {...song, index : index},
        })
    }

    const handleOnPressFav = (index) => {
        setFavSong(favSong === index ? -1 :  index)
    }
  
    return (
        <FlatList
        data={SongsData}
        style={styles.playlistContainer}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>{
            onSongPress(item, index)
          }}>
          <SongCover isFavorite={index === favSong} handleOnPressFav={handleOnPressFav} index={index} song={item}/>
          </TouchableOpacity>)}
      />
      
    );
  };
  const styles = StyleSheet.create({
    playlistContainer : {
    paddingHorizontal: 25

    }
  });


export default Home;