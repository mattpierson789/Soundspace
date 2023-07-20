import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchPosts } from '../../store/posts';
import TrackItem from './TrackItem';
import PostItem from '../Posts/PostItem';
import './Tracks.css';
import { fetchUserFollows, fetchUserFollowing } from '../../store/follow';
import { getAllUsers } from '../../store/session';

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

  const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   if (currentUser) {
  //     dispatch(fetchUserFollows(currentUser.username));
  //     dispatch(fetchUserFollowing(currentUser.username));
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   dispatch(fetchTracks());
  //   dispatch(fetchPosts());
  //   dispatch(getAllUsers())
  //   return () => dispatch(clearTrackErrors());
  // }, []);

  function useMount(callback) {
    useState(() => {
      callback();
    }, []);
  }
  

  useMount(async () => {
    setIsLoading(true);
    await dispatch(fetchTracks());
    await dispatch(fetchPosts());
    await dispatch(getAllUsers());
    await setIsLoading(false);
    return () => dispatch(clearTrackErrors());
  });

  useMount(async () => {
    setIsLoading(true);
    if (currentUser) {
      await dispatch(fetchUserFollows(currentUser.username));
      await dispatch(fetchUserFollowing(currentUser.username));
    }
    setIsLoading(false);
  });


  return (
    <div className="tracks-container-index" >
      <div className="main-content-tracks-container-index">
        <div className="main-content-tracks-index">
          {tracks.length === 0 ? (
            <div className="tracks-index">There are no Tracks at this location &#128577; </div>
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
