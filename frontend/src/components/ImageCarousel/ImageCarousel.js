import React, { useState, useEffect } from 'react';
import '../SessionForms/SigninForm.css';

function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch your images or set them statically
    const fetchedImages = [
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.57.17+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.57.42+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.58.11+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.58.22+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.58.33+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.58.46+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+4.59.45+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+5.00.00+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+5.00.20+PM-PhotoRoom.png',
      'https://soundspace-seeds.s3.amazonaws.com/public/Screen+Shot+2023-06-14+at+5.00.36+PM-PhotoRoom.png',
    ];

    setImages(fetchedImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="image-carousel">
      <img src={images[currentIndex]} alt={`Image ${currentIndex}`} className="carousel-image" />
    </div>
  );
}

export default ImageCarousel;
