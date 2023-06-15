import React from 'react';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';


function Posts() {
    let posts = useSelector(state => Object.values(state.posts.posts));

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;