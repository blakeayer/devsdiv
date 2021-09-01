import React, { Fragment, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useAuth } from '../store/AuthContext' 
import useHttp from '../hooks/useHttp';
import { getAllPosts } from '../lib/api';

import PostList from '../components/Posts/PostsList';
import CreatePost from '../components/CreatePost/CreatePost';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import classes from './Channel.module.css';

const Channel = () => {
    const params = useParams();
    const { currentUser } = useAuth();
    const { sendRequest, status, data: loadedPosts, error } = useHttp(getAllPosts, true);
    let filteredPosts = loadedPosts;

    const addedPostHandler = () => {
        sendRequest();
    };

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    // Determine which channel is selected
    let paramsReact;
    let paramsJavaScript;
    let paramsPython;


    if (params.channel === 'r') {
        paramsReact = true;
    } else if (params.channel === 'js') {
        paramsJavaScript = true;
    } else if (params.channel === 'py') {
        paramsPython = true;
    }
    
    // Render state dependent on sendRequest()
    if (status === 'pending') {
        return <div className={classes.center}>
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <p className={classes.center}>
            {error}
        </p>
    }

    // Filter posts according to params.channel
    if (status === 'completed' && loadedPosts) {
        filteredPosts = loadedPosts.filter(post => post.channel === params.channel)
    }
        
    return (
        <Fragment>
            <div className={classes.center}>

                {paramsReact && <h2>/r/ - React</h2>}
                {paramsJavaScript && <h2>/js/ - Vanilla JavaScript</h2>}
                {paramsPython && <h2>/py/ - Python</h2>}
                {currentUser && 
                    <CreatePost channel={params.channel} onAddedPost={addedPostHandler} />
                }

            </div>
            <div className={classes.center}>
                    <Card className={classes.overview}>
                        <PostList posts={filteredPosts} />
                    </Card>
            </div>
        </Fragment>
    );
}

export default Channel;