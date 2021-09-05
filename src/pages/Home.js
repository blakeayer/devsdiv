import React, { Fragment, useEffect } from 'react';

import { useAuth } from '../store/AuthContext' 
import useHttp from '../hooks/useHttp';
import { getAllPosts } from '../lib/api';

import Bulletin from '../components/Bulletin/Bulletin';
import PostList from '../components/Posts/PostsList';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import classes from './Home.module.css';

const Home = () => {
    const { currentUser } = useAuth();
    const { sendRequest, status, data: loadedPosts, error } = useHttp(getAllPosts, true);
    let filteredPosts = loadedPosts;

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
    
    // Render state dependent on sendRequest()
    if (status === 'pending') {
        return <div className={'center'}>
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <p className={'center'}>
            {error}
        </p>
    }

    // TODO: Filter posts according to 5 most recent
    // if (status === 'completed' && loadedPosts) {
    //     filteredPosts = loadedPosts.filter(post => post.channel === params.channel)
    // }
        
    return (
        <Fragment>
            <div className={'center'}>
                {!currentUser &&
                    <div className={'center'}>
                        <h2>Welcome to the Developer's Division</h2>
                        <h4>&lt;DevsDiv /&gt; is an image-based forum where developers can share their work.</h4>
                        <h4>Visitors do not need an account to view posts, but must register to participate in the community.</h4>
                    </div>
                }
                <Card className={classes.overview}>
                    <Bulletin /> 
                </Card>
            </div>

            <div className={'center'}>
                <Card className={classes.overview}>
                    <h2 className={'title'}>Recent Posts</h2>
                    <PostList posts={filteredPosts} />
                </Card>
            </div>
        </Fragment>
    );
}

export default Home;