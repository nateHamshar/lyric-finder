import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [data, setData] = useState("");
  const [song, setSong] = useState("oi bruv");


  const getResult = () => {
    axios.get()
      .then(res => {
        return res.data
      })
      .then((data) => {
        setData(data)
      })
      .catch(error => console.log(error.message))
  };
 
  useEffect(() => {
    if(!data){
      return;
    } else{
      setSong(data.lyrics)
    }
    }, [data]);

  return (
    <div className="App">
      <button className="getLyrics" onClick={() => getResult()}>get lyrics</button>
      <div className='songLyrics'>{song}</div>
    </div>
  );
}

export default App;
