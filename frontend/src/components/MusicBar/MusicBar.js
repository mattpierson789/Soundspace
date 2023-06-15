import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicBar.css';
import { setCurrentTrack } from '../../store/audio';

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
    const currentIndex = tracks.findIndex((track) => track === currentTrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    dispatch(setCurrentTrack(tracks[nextIndex]));
  };

  const handleClickPrevious = () => {
    const currentIndex = tracks.findIndex((track) => track === currentTrack);
    const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    dispatch(setCurrentTrack(tracks[previousIndex]));
  };

  return (
    <div className='footer-container'>
      <div className="play-bar-track-info">
        <div className="now-playing-image-container">
          {trackImageUrl && <img src={trackImageUrl} alt="" />}
        </div>
        <div className="now-playing-section">
          <div className="now-playing-artist-info">
            <p className="now-playing-artist-info-name">{title}</p>
            <p className="now-playing-artist-info-artist">{artist}</p>
          </div>
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
