import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, uploadTrack } from '../../store/tracks';
import TrackItem from './TrackItem';
import './TrackUpload.css';

function TrackUpload () {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [trackImageUrl, setTrackImageUrl] = useState('');

  const dispatch = useDispatch();
  const author = useSelector(state => state.session.currentUser);
  const newTrack = useSelector(state => state.tracks.new);
  const errors = useSelector(state => state.errors.tracks);

  useEffect(() => {
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const trackData = { artist, title, genre, trackFile, trackImageUrl };
    dispatch(uploadTrack(trackData));
    setArtist('');
    setTitle('');
    setGenre('');
    setTrackFile(null);
    setTrackImageUrl('');
  };

  const updateArtist = e => setArtist(e.currentTarget.value);
  const updateTitle = e => setTitle(e.currentTarget.value);
  const updateGenre = e => setGenre(e.currentTarget.value);
  const updateTrackFile = e => setTrackFile(e.currentTarget.files[0]);

  return (
    <>
      <form className="upload-track" onSubmit={handleSubmit}>
        <input 
          type="text"
          value={artist}
          onChange={updateArtist}
          placeholder="Artist Name"
          required
        />
        <input 
          type="text"
          value={title}
          onChange={updateTitle}
          placeholder="Song Name"
          required
        />
        <input 
          type="text"
          value={genre}
          onChange={updateGenre}
          placeholder="Genre"
          required
        />
        <input 
          type="text"
          value={trackImageUrl}
          onChange={e => setTrackImageUrl(e.target.value)}
          placeholder="Track Image URL"
          required
        />
        <input 
          type="file"
          onChange={updateTrackFile}
          required
        />
        <div className="errors">{errors ? errors.text : null }</div>
        <input type="submit" value="Upload" />
      </form>
      <div className="track-preview">
        <h3>Track Preview</h3>
        {trackFile ? <TrackItem track={{ artist, title, genre, author, trackImageUrl }} /> : undefined}
      </div>
      <div className="previous-track">
        <h3>Previous Track</h3>
        {newTrack ? <TrackItem track={newTrack} /> : undefined}
      </div>
    </>
  )
}

export default TrackUpload;
