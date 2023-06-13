import { useSelector } from "react-redux";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicBar.css';

function MusicBar() {
  const currentTrack = useSelector(state => state.audio.currentTrack);
  const TrackUrl = currentTrack?.mp3;

  // Return alternative UI or default state for playbar
  if (!currentTrack) {
    return null;
  }

  return (
    <div className='footer-container'>
      <div className="play-bar-track-info">
        <div className="now-playing-section">
          <div className="now-playing-artist-info">
            <p className="now-playing-artist-info-name">{currentTrack.name}</p>
            <p className="now-playing-artist-info-artist">{currentTrack.artist}</p>
          </div>
        </div>
      </div>
      <div className="play-bar-control-container">
          <AudioPlayer 
            src={TrackUrl} 
            layout="stacked-reverse"
            autoPlay={true}
            showFilledVolume={true}
            style={{
              width: '100%',
              height: '100%'
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
