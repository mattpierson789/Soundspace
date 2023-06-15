import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchPosts } from '../../store/posts';
import TrackItem from './TrackItem';
import PostItem from '../Posts/PostItem'; 
import './Tracks.css';

function Tracks({ locationValue } = null) {
  const dispatch = useDispatch();
  let tracks = useSelector(state => Object.values(state.tracks.allTracks));
  const posts = useSelector(state => Object.values(state.posts.posts));

  debugger;
  if (locationValue && locationValue !== "Global") {
    debugger;
    tracks = tracks.filter(track => track.location && track.location === locationValue);
  }

  useEffect(() => {
    dispatch(fetchTracks());
    debugger
    dispatch(fetchPosts());
    debugger
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);

  const backgroundImage = locationValue && locationValue !== "Global" ? 
    'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background' : 
    'https://soundspace-seeds.s3.amazonaws.com/public/Theme+Images/NYC+MainPage+Background'; 

  return (
    // <div className="tracks-container" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <div className="tracks-container">
      <h2 className="trending-title">{`Trending ${
        locationValue !== 'Global' ? `in ${locationValue}` : 'around the World'
      }`}</h2>
      <div className="main-content-tracks-container">
        <div className="main-content-tracks">
          {tracks.length === 0 ? (
            <div className="tracks">There are no Tracks at this location &#128577; </div>
          ) : (
            tracks.map(track => <TrackItem key={track._id} track={track} />)
          )}
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
