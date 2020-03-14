import React from 'react';
import Router from './routes';
import './App.scss';

function App() {
  return (
    <main>
      <div className="page-loader">
        <div className="loader">Loading...</div>
      </div>
      <Router/>
      <div className="scroll-up"><a href="#totop"><i className="fa fa-angle-double-up"></i></a></div>
    </main>
  );
}

export default App;
