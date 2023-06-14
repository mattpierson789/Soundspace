import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadTrack } from '../../store/tracks';

function MusicUploadForm() {
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.currentUser);
  const errors = useSelector(state => state.errors.tracks);

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedAudioFile) {
      formData.append('files', selectedAudioFile);
    }
    if (selectedImageFile) {
      formData.append('files', selectedImageFile);
    }
    formData.append('userId', user._id);
    formData.append('title', title);
    formData.append('genre', genre);

    dispatch(uploadTrack(formData));

    setTitle('');
    setGenre('');
    
    setSelectedAudioFile(null);
    setSelectedImageFile(null);
  };

  const handleAudioFileChange = event => {
    const audioFile = event.target.files[0];
    setSelectedAudioFile(audioFile);
  };

  const handleImageFileChange = event => {
    const imageFile = event.target.files[0];
    setSelectedImageFile(imageFile);
  };

  return (
    <>
      <form className="upload-track" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleImageFileChange}
          name="imageFile"
          accept="image/jpeg, image/png"
          required
        />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Song Name"
          required
        />
        <select
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
          required
        >
          <option value="">Select Genre</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Electronic">Electronic</option>
        </select>
        <input
          type="file"
          onChange={handleAudioFileChange}
          name="audioFile"
          accept="audio/mpeg"
          required
        />
        <div className="errors">{errors ? errors.text : null}</div>
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}

export default MusicUploadForm;
