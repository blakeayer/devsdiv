import React, { Fragment } from 'react';
import PostDetail from './PostDetail';
import Card from '../UI/Card';
import classes from './PostsList.module.css';
import Thumbnail from '../UI/Thumbnail';
import { Link } from 'react-router-dom';

const PostsList = (props) => {

    return (
        <Fragment>
            <ul className={classes.list}>
                {props.posts.map((post) => (
                    <div className={classes.listItemWrapper} key={post.id}>
                        <Card>
                            <div className={classes['container-row']}>
                                
                                <div className={classes.thumbnail}>
                                    <Thumbnail url={post.url} />
                                </div>
                                
                                <div className={classes.listItem} >
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
        </Fragment>
    );
};

export default PostsList;