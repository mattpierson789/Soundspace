import React, { useEffect, useState } from 'react';
import './MusicFileUpload';
import { useSelector } from 'react-redux';
import { getCookie } from '../../store/jwt.js';

function MusicUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  const user = useSelector((state) => state.session.currentUser);

  useEffect(() => {
    const cookieHeader = document.cookie; // Get the cookie header from the document
    const token = getCsrfToken(cookieHeader);
    setCsrfToken(token);
  }, []);

  const getCsrfToken = (cookieHeader) => {
    const cookies = cookieHeader.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === 'CSRF-TOKEN') {
        return cookie[1];
      }
    }
    return null; // CSRF token not found
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('audiofile', selectedFile);
    formData.append('userId', user._id);

    try {
      const response = await fetch('/api/users/upload-music', {
        method: 'POST',
        body: formData,
        headers: {
          'CSRF-Token': csrfToken,
        },
      });

      if (response.ok) {
        console.log('Music file uploaded successfully');
      } else {
        console.error('Failed to upload music file');
      }
    } catch (error) {
      console.error('An error occurred while uploading the music file', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
       <button type="submit">Upload Tracks</button>
      <input type="file" onChange={handleFileChange} />
    </form>
  );
}

export default MusicUploadForm;
