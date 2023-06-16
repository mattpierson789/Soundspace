import React, { useState, useEffect } from 'react';
import './CityBanner.css';
import { useSelector } from 'react-redux';

const CityBanner = () => {
  const currentUser = useSelector(state => state.session.currentUser);
  const location = currentUser ? currentUser.location : null;
  const [backgroundImage, setBackgroundImage] = useState('');
  const [locationValue, setLocationValue] = useState(location);

  const handleLocationValue = (value) => {
    setLocationValue(value);
  };

  useEffect(() => {
    let newBackgroundImage = '';

    if (locationValue === 'LA') {
      newBackgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+1.29-PhotoRoom.png';
    } else if (locationValue === 'NYC') {
      newBackgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background';
    } else if (locationValue === 'ATL') {
      newBackgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/ATL+MainPage+Background';
    } else {
      newBackgroundImage = 'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/Screen+Shot+2023-06-15+at+1.20-PhotoRoom.png';
    }

    setBackgroundImage(newBackgroundImage);
  }, [locationValue]);

  console.log(locationValue)
  return (
    <div className="city-banner-component" style={{ backgroundImage: `url(${backgroundImage})` }}>
    </div>
  );
};

export default CityBanner;
