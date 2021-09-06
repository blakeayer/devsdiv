import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import '../../../node_modules/draft-js/dist/Draft.css';

import useHttp from '../../hooks/useHttp';
import { useAuth } from '../../store/AuthContext';
import { getSinglePost } from '../../lib/api';
import EditPost from '../EditPost/EditPost';
import TextEditor from '../RichTextEditor/TextEditor';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './PostDetail.module.css';

const PostDetail = (props) => {
    const [readOnly, setReadOnly] = useState(true);
    const [textEditorData, setTextEditorData] = useState('');
    const [changeMade, setChangeMade] = useState();
    const { postId } = useParams();
    const { currentUser } = useAuth();

    const { sendRequest, status, data: loadedPost, error } = useHttp(getSinglePost, true);
    
    const parsedContent = JSON.parse(props.content);
    const contentState = convertFromRaw(parsedContent);
    
    const [ editorState, setEditorState ] = useState(() =>
        EditorState.createWithContent(contentState),
    );

    const editPostHandler = () => {
       setReadOnly(!readOnly);
    };

    const changeMadeHandler = () => {
        setChangeMade(true);
    };

    const passJsonData = (jsonString) => {
        setTextEditorData(jsonString)
    };

    useEffect(() => {
        // console.log(textEditorData);
    }, [textEditorData])

    useEffect(() => {
        sendRequest(postId);
    }, [sendRequest, postId, changeMade])

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
                <p className='center'>No post found!</p>;
            </div>
        );
    }

    return (
            
        <div className={classes['post-detail-container']}>

                <div className={classes['post-header-container']}>
                    <div className={classes['post-header']}>
                        <p className={classes.username}>{props.author}</p>
                        <p>{props.dateTime}</p>
                        <p>#{props.id}</p>
                    </div>
                    {currentUser && (currentUser.email === props.author) 
                        && <div onClick={editPostHandler}>Edit</div>
                    }
                </div>

            <h3>{props.title}</h3>
            <div className='PostDetail'>
                {readOnly && 
                    <TextEditor 
                        editorState={editorState}
                        onChange={setEditorState}
                        passJsonData={passJsonData} 
                        readOnly={readOnly} 
                    />
                }
                {!readOnly && (
                    <EditPost
                        editPostHandler={editPostHandler}
                        changeMadeHandler={changeMadeHandler}
                        contentState={contentState}
                        postId={props.uri}
                    />
                )}
            </div>

        </div>

    );
};

export default PostDetail;