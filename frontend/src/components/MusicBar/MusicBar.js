import React from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicBar.css';

function MusicBar() {
  const currentTrack = useSelector(state => state.audio.currentTrack);

  if (!currentTrack) {
    return null;
  }

  const { song, artist, trackUrl, trackImageUrl } = currentTrack;

  return (
    <div className="footer-container">
      <div className="play-bar-track-info">
        <div className="now-playing-section">
          <div className="now-playing-artist-info">
            <p className="now-playing-song-image">{trackImageUrl}</p>
            <p className="now-playing-artist-info-name">{artist}</p>
            <p className="now-playing-song-name">{song}</p>
          </div>
        </div>
      </div>
      <div className="play-bar-control-container">
        <AudioPlayer
          src={trackUrl}
          layout="stacked-reverse"
          autoPlay
          showFilledVolume
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
        />
      </div>
    </div>
  );
}

export default MusicBar;
