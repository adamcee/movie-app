import "./App.css";
import { useState } from 'react';

import Title from "./Title/Title";
import Playlist from "./Playlist/Playlist";
import AddSong from "./AddSong/AddSong";
import Favorites from "./Favorites/Favorites";

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

/***
 * -App
 *  - Title
 *    - Playlist
 *      - Song
 *      - Song
 *      - Song
 *  - AddSong
 *    - AddSongForm
 *    - AddSongButton
 */
function App(props) {
  const [songs, setSongs] = useState(props.songs);

  const createSong = (title, artist) => {
    const updatedSongs = songs.concat([{title, artist }]);
    setSongs(updatedSongs);
  }

  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/favorites">Favorite songs</Link>
          <Link to="/playlist">Playlist</Link>
          <Link to="/add-song">Add Song</Link>
        </div>

        <Switch>
          <Route path="/playlist">
            <Playlist songs={songs} />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/add-song">
            <AddSong createSong={createSong} />
          </Route>
        </Switch>

        <Title />
    </Router>
    </div>
  );
}

export default App;
