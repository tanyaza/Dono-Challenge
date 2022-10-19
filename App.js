import React, { useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import { createStackNavigator } from '@react-navigation/stack';
import Song from "./screens/Song";
import { AppContext } from "./store/AppContext";
const App = () => {
  const Stack = createStackNavigator();
  const [favSong, setFavSong] = useState(-1);


  return (
    <NavigationContainer>
       <AppContext.Provider value={[favSong, setFavSong]}>
       <Stack.Navigator>
       <Stack.Screen name="Playlist" component={Home} />
       <Stack.Screen name="Song" component={Song} options={({route}) => ({song: route.params.song})} />
       </Stack.Navigator>
       </AppContext.Provider>
      
    </NavigationContainer>
    
  )
}



export default App;