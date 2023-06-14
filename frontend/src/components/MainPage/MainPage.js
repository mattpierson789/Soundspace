import React from 'react';
import './MainPage.css'

function MainPage() {
    return (
      <>
      <div className="splash-header">

        <h1> Soundspace </h1>


      </div>
        <div className="splash-container">
        <img id='splash-image' className="center" src='https://soundspace-seeds.s3.amazonaws.com/public/Soundspace-Splash-Image' />
        <footer className="splash-footer">
          Copyright &copy;  Soundspace 2023
        </footer>
        </div>
      </>
    );
  }
  
  export default MainPage;