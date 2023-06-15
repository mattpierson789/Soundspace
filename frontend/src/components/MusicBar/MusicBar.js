import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicBar.css';
import { setCurrentTrack, increasePlayCount } from '../../store/audio';

function MusicBar() {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.audio.currentTrack);
  const user = useSelector((state) => state.session.currentUser);
  const tracks = useSelector((state) => state.tracks.allTracks);

  if (!currentTrack || !user) {
    return null;
  }

  const { title, artist, trackUrl, trackImageUrl } = currentTrack;

  const handleClickNext = () => {
  const currentIndex = tracks.findIndex((track) => track._id === currentTrack._id);
  const nextIndex = (currentIndex + 1) % tracks.length;
  dispatch(setCurrentTrack(tracks[nextIndex]));
  if (currentTrack.trackUrl !== tracks[nextIndex].trackUrl) {
    dispatch(increasePlayCount(currentTrack._id));
  }
};

const handleClickPrevious = () => {
  const currentIndex = tracks.findIndex((track) => track._id === currentTrack._id);
  const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  dispatch(setCurrentTrack(tracks[previousIndex]));
  if (currentTrack.trackUrl !== tracks[previousIndex].trackUrl) {
    dispatch(increasePlayCount(currentTrack._id));
  }
};


  return (
    <div className='footer-container'>
      <div className="now-playing-section">
        <div className="now-playing-image-container">
          <img className="now-playing-image" src={trackImageUrl} alt="Now Playing Image" />
        </div>
        <div className="now-playing-info-container">
          <p className="now-playing-info-name">{title}</p>
          <p className="now-playing-info-artist">{artist}</p>
        </div>
      </div>
      <div className="play-bar-control-container">
        <AudioPlayer
          showSkipControls
          src={trackUrl}
          layout="stacked-reverse"
          autoPlay={true}
          showFilledVolume={true}
          style={{
            width: '100%',
            height: '100%',
          }}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            RHAP_UI.VOLUME,
          ]}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          onEnded={handleClickNext}
        />
      </div>
    </div>
  );
}

export default MusicBar;
