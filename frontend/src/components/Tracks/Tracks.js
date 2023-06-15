import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchPosts } from '../../store/posts';
import TrackItem from './TrackItem';
import PostItem from '../Posts/PostItem';
import './Tracks.css';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';

function Tracks({ trendingPage, locationValue = null }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  // These are for the following page ONLY
  const following = useSelector((state) => Object.values(state.follow.following));
  const filteredFollowing = following.filter((item) => item !== null);
  const usernames = filteredFollowing.map((item) => item.username);

  let tracks = useSelector((state) => Object.values(state.tracks.allTracks));

  if (trendingPage === false) {
    tracks = tracks.filter((track) => usernames.includes(track.artist));
    locationValue = null;
  }

  const posts = useSelector((state) => Object.values(state.posts.posts));

  if (locationValue && locationValue !== 'Global') {
    tracks = tracks.filter((track) => track.location && track.location === locationValue);
  }

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserFollows(currentUser.username));
      dispatch(fetchUserFollowing(currentUser.username));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchPosts());
    return () => dispatch(clearTrackErrors());
  }, [dispatch]);


  return (
    <div className="tracks-container" >
      <div className="main-content-tracks-container">
        <div className="main-content-tracks">
          {tracks.length === 0 ? (
            <div className="tracks">There are no Tracks at this location &#128577; </div>
          ) : (
            tracks.map((track) => <TrackItem key={track._id} track={track} />)
          )}
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
