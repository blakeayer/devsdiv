import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import '../../../node_modules/draft-js/dist/Draft.css';

import useHttp from '../../hooks/useHttp';
import { getSingleComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './CommentDetail.module.css';

const CommentDetail = (props) => {
    const params = useParams();
    const { postId } = params;
    const { sendRequest, status, data: loadedComment, error } = useHttp(getSingleComment, true);

    const parsedContent = JSON.parse(props.content);
    const contentState = convertFromRaw(parsedContent);

    const [ editorState, setEditorState ] = useState(() =>
        EditorState.createWithContent(contentState),
    );

    useEffect(() => {
        sendRequest(postId);
    }, [sendRequest, postId])

    if (status === 'pending') {
        return <div className={classes.center}>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className={classes.center}>{error}</p>;
    }

    if (!loadedComment) {
        return <p className={classes.center}>No comments found! COMMENT DETAIL</p>;
    }

    return (
        <Fragment>
            <div className={classes['container-column']}>
                
                <div className={classes['container-row']}>
                    <p className={`${classes.username}`}>{props.author}</p>
                    <p>{props.dateTime}</p>
                    <p>#{props.id}</p>
                </div>

                <div className='CommentDetail'>
                    <Editor 
                        editorState={editorState} 
                        onChange={setEditorState} 
                        readOnly={true}
                    />
                </div>                    
            </div>

        </Fragment>
    );
};

export default CommentDetail;