import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Image, Text , TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import pauseIcon from "../assets/icons/audio/pause.png";
import playIcon from "../assets/icons/audio/play.png";
import Slider from '@react-native-community/slider';
import FavoriteButton from '../components/FavoriteButton';
import { AppContext } from '../store/AppContext';

const Song = ({route, navigation}) => {
 const song = route.params.song;
 const [sound, setSound] = React.useState();
 const [isPlaying, setIsPlaying] = useState(false);
 const [playbackPosition, setPlaybackPosition] = useState(0);
 const [isFavorite, setIsFavorite] = useState(false)
 const [favSong, setFavSong] = useContext(AppContext);

 useEffect(()=>{
  setIsFavorite(favSong === song?.index)
 }, [favSong])

  async function playSound() {
    setIsPlaying(true);

    // playing song for the first time
    if(sound == null){
      const { sound } = await Audio.Sound.createAsync({
        uri : song?.audio
      });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate(async ()=>{
        const status = await sound.getStatusAsync();
        setPlaybackPosition(status.positionMillis);
           
      })
      await sound.playAsync();
      
    }

    //resume song from last position
    await sound.playFromPositionAsync(playbackPosition)
    
  }

  const onSliderValueChanged = async (value) =>{
    const newPosition = Math.floor(song?.totalDurationMs * value)
     await sound.setPositionAsync(newPosition);
    setPlaybackPosition(newPosition)
  }
 
  async function pauseSound() {
    setIsPlaying(false);
    await sound.setStatusAsync({
      shouldPlay: false,
    });

    const songStatus = await sound.getStatusAsync();
    setPlaybackPosition(songStatus.positionMillis);
  }

  const renderPlayPauseButton = isPlaying => {
    const playbackIcon = isPlaying ? pauseIcon : playIcon;
    const onPressPlaybackBtn = isPlaying ? pauseSound : playSound;
    return <TouchableOpacity onPress={onPressPlaybackBtn}>
        <Image
        style={styles.audioPlayback}
        source={playbackIcon}
        />
      </TouchableOpacity>
  };
  const convertTime = duration => {
    const sec = Math.floor((duration) / 1000);
    const minute = Math.floor(sec / 60);
    if (minute < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (minute < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }
    return `${minute}:${sec}`;
    
  };

  useEffect(() => {
    navigation.setOptions({ title: song?.title })
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

 
  return (
    <View style={styles.songPageContainer}> 
      <View style={styles.songCover}>
        <Image
          style={styles.songCoverImg}
          source={{
            uri: song?.cover,
          }}
        />
        <View style={styles.FavButton}>
        <FavoriteButton isFavorite={isFavorite} handleOnPressFav={()=>{
          setFavSong(isFavorite ? -1 : song?.index)
        }}/>
        </View> 
      </View>
      {renderPlayPauseButton(isPlaying)}
      <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor='gray'
          maximumTrackTintColor='rgba(255, 255, 255, 0.6)'
          value={playbackPosition / song.totalDurationMs}
          onValueChange={value => { 
              onSliderValueChanged(value)
          }}
            
          />
      <Text style={styles.timeText}>{convertTime(playbackPosition)} / {convertTime(song?.totalDurationMs)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  songPageContainer: {
    paddingHorizontal : 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  slider:{
    width: 350,
    height: 40,
    marginVertical: 10

  },
  audioPlayback: {
    width: 80,
    height: 80
  },
  
  songName : {
    fontSize: 18,
    marginBottom: 10
  },
  FavButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  songCover: {
    width: '100%'
  },

  songCoverImg: {
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  }
});

export default Song;