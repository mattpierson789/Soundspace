import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadTrack } from '../../store/tracks';

function MusicUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.currentUser);
  const errors = useSelector(state => state.errors.tracks);

  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('audiofile', selectedFile);
    formData.append('artist', artist);
    formData.append('song', song);
    formData.append('genre', genre);
    formData.append('userId', user._id); 

    dispatch(uploadTrack(formData));

    setArtist('');
    setSong('');
    setGenre('');
    setSelectedFile(null);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <form className="upload-track" onSubmit={handleSubmit}>
        <input 
          type="text"
          value={artist}
          onChange={e => setArtist(e.target.value)}
          placeholder="Artist Name"
          required
        />
        <input 
          type="text"
          value={song}
          onChange={e => setSong(e.target.value)}
          placeholder="Song Name"
          required
        />
        <input 
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />
        <input 
          type="file"
          onChange={handleFileChange}
          required
        />
        <div className="errors">{errors ? errors.text : null}</div>
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}

export default MusicUploadForm;
