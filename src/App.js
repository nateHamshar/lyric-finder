import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState("");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState();
  const [title, setTitle] = useState();

  const getResult = () => {
    //clear lyrics displayed
    setSong(null)
    // update buttons text to show it is loading
    const buttonText = document.querySelector("button")
    buttonText.textContent = "Loading..."
    //replace the whitespaces in the search with hyphens to make api request work properly
    const cleanArtist = artist;
    const cleanTitle = title;
    cleanArtist.replace(/\s/g, "-")
    cleanTitle.replace(/\s/g, "-")
    //request the song lyrics
    axios.get(`https://api.lyrics.ovh/v1/${cleanArtist}/${cleanTitle}`)
      .then(res => {
        return res.data
      })
      .then((data) => {
        setData(data)
        buttonText.textContent = "Search"
      })
      .catch(error => console.log(error));
  };
 //update the displayed lyrics
  useEffect(() => {
    if(!data){
      return;
    } else{
      setSong(data.lyrics)
    }
    }, [data]);

  return (
    <div className="App">
      <div className="container">
        <header className="title">The Lyric Genie</header>
        <div className="searchBar">
          <input required type="text" className="songArtist" placeholder='Artist' onChange={e => setArtist(e.target.value)}/>
          <input required type="text" className="songTitle" placeholder='Title' onChange={e => setTitle(e.target.value)}/>
          <button className="getLyrics" onClick={() => getResult()}>Search</button>
        </div>

        <div>
          <h1>{artist}</h1>
          <h3>{title}</h3>
        </div>
        {song && <div className='lyrics'>{song}</div>}
      </div>
    </div>
  );
}

export default App;
