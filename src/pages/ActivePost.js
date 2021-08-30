import { Fragment, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useAuth } from '../store/AuthContext' 

import useHttp from '../hooks/useHttp';
import { getSinglePost } from '../lib/api';

import CreateComment from '../components/CreateComment/CreateComment';
import PostDetail from '../components/Posts/PostDetail';
import CommentsList from '../components/Comments/CommentsList';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import classes from './ActivePost.module.css';
import Thumbnail from '../components/UI/Thumbnail';

const ActivePost = () => {
  const params = useParams();

  const { postId, channel } = params;

  const { currentUser } = useAuth();


  const { sendRequest, status, data: loadedPost, error } = useHttp(
    getSinglePost,
    true
  );

  useEffect(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  const addedCommentHandler = () => {
    sendRequest(postId);
    console.log('addedCommentHandler');
};

  if (status === 'pending') {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='center'>{error}</p>;
  }

  if (!loadedPost.content) {
    return (
      <div className='center'>
        <p className='center'>
            No post found!
        </p>
      </div>
    )
  }

  return (
    <Fragment>
      { !currentUser && <div className='center'></div>}
      { currentUser && 
      <div className='center'>
        <CreateComment channel={channel} onAddedComment={addedCommentHandler} />
      </div>
      }
      <Card className={classes['active-post']}>
        <div className={classes['container-row']}>

          <div className={classes.thumbnail}>
            <Thumbnail url={loadedPost.url}/>
          </div>

          <div className={classes.listItem} >
            <PostDetail
              key={loadedPost.id}
              id={loadedPost.postId}
              uri={loadedPost.id}
              author={loadedPost.author}
              dateTime={loadedPost.dateTime.toLocaleString('en-US', {dateStyle:'short', timeStyle: 'long'})}
              title={loadedPost.title}
              content={loadedPost.content}
              channel={loadedPost.channel}
            />
          </div>

        </div>
      </Card>
      <div className={classes.listWrapper}>
        <CommentsList />
      </div>
    </Fragment>
  );
};

export default ActivePost;