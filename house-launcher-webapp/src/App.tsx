import React from 'react';
import './App.css';
import Header from 'components/Header/Header';
import MarketingChart from 'components/Marketing.Chart/Marketing.Chart';


function App() {

  return (
    <div className="main-wrapper">
      <Header />
      <div className='home-page'>
        <MarketingChart />
      </div>
    </div>
  );
}

export default App;
