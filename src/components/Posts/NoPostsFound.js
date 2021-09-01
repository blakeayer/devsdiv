import React from 'react';

import CreatePost from '../CreatePost/CreatePost';
import classes from './NoPostsFound.module.css';

const NoPostsFound = () => {
    return (
        <div className={classes.noPosts}>
            <p>No posts found!</p>
            <CreatePost />
        </div>
    );
};

export default NoPostsFound;