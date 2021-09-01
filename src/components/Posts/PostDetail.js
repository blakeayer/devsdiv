import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import '../../../node_modules/draft-js/dist/Draft.css';

import useHttp from '../../hooks/useHttp';
import { getSinglePost } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './PostDetail.module.css';

const PostDetail = (props) => {
    const params = useParams();
    const { postId } = params; //Destructured params so that :Channel does not trigger useEffect
    const { sendRequest, status, data: loadedPost, error } = useHttp(getSinglePost, true);
    
    const parsedContent = JSON.parse(props.content);
    const contentState = convertFromRaw(parsedContent);
    
    const [ editorState, setEditorState ] = useState(() =>
        EditorState.createWithContent(contentState),
    );

    useEffect(() => {
        sendRequest(postId);
    }, [sendRequest, postId])

    if (status === 'pending') {
        return <div className='center'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className='center'>{error}</p>;
    }

    if (!loadedPost) {
        return (
            <div className='center'>
                <p className='center'>No post found! POST DETAIL</p>;
            </div>
        );
    }

    return (
            
            <div className={classes['container-column']}>

                <div className={classes['container-row']}>
                    <p className={classes.username}>{props.author}</p>
                    <p>{props.dateTime}</p>
                    <p>#{props.id}</p>
                </div>

                <h3>{props.title}</h3>
                <div className='PostDetail'>
                    <Editor 
                        editorState={editorState} 
                        onChange={setEditorState} 
                        readOnly={true}
                    />
                </div>

            </div>

    );
};

export default PostDetail;