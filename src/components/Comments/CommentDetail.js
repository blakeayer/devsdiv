import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import '../../../node_modules/draft-js/dist/Draft.css';

import useHttp from '../../hooks/useHttp';
import { useAuth } from '../../store/AuthContext';
import { getSingleComment } from '../../lib/api';
import EditComment from '../EditComment/EditComment';
import TextEditor from '../RichTextEditor/TextEditor';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './CommentDetail.module.css';

const CommentDetail = (props) => {
    const [readOnly, setReadOnly] = useState(true);
    const [textEditorData, setTextEditorData] = useState('');
    const [changeMade, setChangeMade] = useState();
    const { postId } = useParams();
    const { currentUser } = useAuth();

    const { sendRequest, status, data: loadedComment, error } = useHttp(getSingleComment, true);

    const parsedContent = JSON.parse(props.content);
    const contentState = convertFromRaw(parsedContent);

    const [ editorState, setEditorState ] = useState(() =>
        EditorState.createWithContent(contentState),
    );

    const editCommentHandler = () => {
        setReadOnly(!readOnly);
     };
 
     const changeMadeHandler = () => {
         setChangeMade(true);
     };
 
     const passJsonData = (jsonString) => {
         setTextEditorData(jsonString)
     };

    useEffect(() => {
        sendRequest(postId);
    }, [sendRequest, postId, changeMade])

    if (status === 'pending') {
        return <div className={classes.center}>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className={classes.center}>{error}</p>;
    }

    if (!loadedComment) {
        return (
            <div className='center'>
                <p className='center'>No comments found!</p>;
            </div>
        );
    }

    return (

        <div className={classes['container-column']}>
            
            <div className={classes['space-between']}>
                <div className={classes['container-row']}>
                    <p className={`${classes.username}`}>{props.author}</p>
                    <p>{props.dateTime}</p>
                    <p>#{props.id}</p>
                </div>
                {currentUser && (currentUser.email === props.author) 
                    && <div onClick={editCommentHandler}>Edit</div>
                }
            </div>

            {/* <h3>props.title</h3> */}
            <div className='CommentDetail'>
                {readOnly && 
                    <TextEditor 
                        editorState={editorState}
                        onChange={setEditorState}
                        passJsonData={passJsonData} 
                        readOnly={readOnly} 
                    />
                }
                {!readOnly && (
                    <EditComment
                        editCommentHandler={editCommentHandler}
                        changeMadeHandler={changeMadeHandler}
                        contentState={contentState}
                        postId={props.postId}
                        commentId={props.uri}
                    />
                )}
            </div> 
                                
        </div>
    );
};

export default CommentDetail;