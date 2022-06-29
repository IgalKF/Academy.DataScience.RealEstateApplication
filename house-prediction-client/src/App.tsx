import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import SearchBar from './features/search-bar/SearchBar';
import Map from './features/map/Map';

function App() {
  return (
    <div className="App bg-slate-900">
      <header className="App-header">
        <SearchBar />
        <Map/>
        <h1 className='text-white mt-5'>כמה עולה לי?</h1>
        <Counter/>
      </header>
    </div>
  );
}

export default App;
