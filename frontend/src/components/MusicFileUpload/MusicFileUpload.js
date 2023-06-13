import React, { useEffect, useState } from 'react';
import './MusicFileUpload';
import { useSelector, useDispatch } from 'react-redux';
import { clearTrackErrors, uploadTrack } from '../../store/tracks';
import TrackItem from '../Tracks/TrackItem';

function MusicUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.currentUser);
  debugger
  const newTrack = useSelector(state => state.tracks.new);
  const errors = useSelector(state => state.errors.tracks);

  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [genre, setGenre] = useState('');
  const [trackFile, setTrackFile] = useState(null);

  // useEffect(() => {
  //   return () => dispatch(clearTrackErrors());
  // }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('audiofile', selectedFile);
    formData.append('artist', artist);
    formData.append('song', song);
    formData.append('genre', genre);
    // formData.append('user', user.name);
    formData.append('userId', user._id);
    debugger
    dispatch(uploadTrack(formData));
    debugger
    setArtist('');
    setSong('');
    setGenre('');
    setTrackFile(null);
    debugger
    console.log("submitted")
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleFormSubmit}>
       <button type="submit">Upload Tracks</button>
      <input type="file" onChange={handleFileChange} />
    </form>
=======
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
      <div className="track-preview">
        <h3>Track Preview</h3>
        {trackFile ? <TrackItem track={{ artist, song, genre, user: user.name }} /> : null}
      </div>
      <div className="previous-track">
        <h3>Previous Track</h3>
        {newTrack ? <TrackItem track={newTrack} /> : null}
      </div>
    </>
>>>>>>> f1953af (upload song)
  );
}

export default MusicUploadForm;
