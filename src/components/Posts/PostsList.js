import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../UI/Card';
import PostDetail from './PostDetail';
import Thumbnail from '../UI/Thumbnail';

import classes from './PostsList.module.css';


const PostsList = (props) => {

    return (
        <ul className={classes.list}>
            {props.posts.map((post) => (
                <div className={classes['list-item-wrapper']} key={post.id}>
                    <Card>
                        <div className={classes['list-item-container']}>
                            
                            <Thumbnail url={post.url} />
                            
                            <div className={classes['list-item']} >
                                <Link to={`${post.channel}/${post.id}`}>
                                    <PostDetail
                                        key={post.id}
                                        id={post.postId}
                                        uri={post.id}
                                        author={post.author}
                                        dateTime={post.dateTime.toLocaleString('en-US', {dateStyle:'short', timeStyle: 'long'})}
                                        title={post.title}
                                        content={post.content}
                                        url={post.url}
                                        channel={post.channel}
                                    />
                                </Link>
                            </div>
                        
                        </div>
                    </Card>
                </div>
            ))}
        </ul>
    );
};

export default PostsList;