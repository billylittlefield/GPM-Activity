import React from 'react';
import logo from './logo.svg';
import activity from './activity.json';
import './App.css';

let parsedData = activity.map(d => ({ ...d, time: new Date(d.time)}));
parsedData = parsedData.filter(d => d.time > new Date('2019-01-01') && d.title.startsWith('Listened'));

const byArtist = parsedData.reduce((acc, cur) => {
  acc[cur.description] = acc[cur.description] ? acc[cur.description] + 1 : 1;
  return acc;
}, {});

const bySong = parsedData.reduce((acc, cur) => {
  acc[cur.title] = acc[cur.title] ? acc[cur.title] + 1 : 1;
  return acc;
}, {})

function App() {
  return (
    <div className="App" style={{display: 'flex', margin: '40px', textAlign: 'left'}}>
    <div>
        <h2>Artists</h2>
        {Object.keys(byArtist).sort((a, b) => byArtist[b] - byArtist[a]).map((artist, index) => {
          return (
            <div>{index + 1}. {artist}: {byArtist[artist]} listens</div>
          )
        })}
      </div>
      <div>
        <h2>Songs</h2>
        {Object.keys(bySong).sort((a, b) => bySong[b] - bySong[a]).map((song, index) => {
          return (
            <div>{index + 1}. {song.replace('Listened to ', '')}: {bySong[song]} listens</div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
