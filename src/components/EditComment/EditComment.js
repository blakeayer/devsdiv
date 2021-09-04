import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { database } from '../../firebase/firebase';

import TextEditor from '../RichTextEditor/TextEditor';
import classes from './EditComment.module.css';

const EditComment = (props) => {
    const [textEditorData, setTextEditorData] = useState('');
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(props.contentState),
    );

    const passJsonData = (jsonString) => {
        setTextEditorData(jsonString)
    };

    useEffect(() => {
        // console.log(textEditorData);
        
    }, [textEditorData])

    const submitFormHandler =  (event) => {
        event.preventDefault();
        const commentRef = database.ref('comments').child(props.postId).child(props.commentId);
        async function post () {
            try {
            await commentRef.update({content: textEditorData});
            await props.editCommentHandler();
            await props.changeMadeHandler();
            } catch (error) {
                alert(error);
            }
        }
        post();
    };

    return (
        <div>
            <TextEditor 
                editorState={editorState} 
                onChange={setEditorState}
                passJsonData={passJsonData}
            />
            <div className={classes.controls}>
                <button onClick={props.editCommentHandler}>Cancel</button>
                <button onClick={submitFormHandler} type='submit'>Submit</button>
            </div>
        </div>
    );
};

export default EditComment;