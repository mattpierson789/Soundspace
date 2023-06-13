import React from 'react';
import './MainPage.css'

function MainPage() {
    return (
      <>
        <div className="splash-container">
        <img id='splash-image' className="center" src='https://soundspace-seeds.s3.amazonaws.com/public/Soundspace-Splash-Image' />
        <footer>
          Copyright &copy;  Soundspace 2023
        </footer>
        </div>
      </>
    );
  }
  
  export default MainPage;