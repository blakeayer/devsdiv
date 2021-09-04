import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { database } from '../../firebase/firebase';

import TextEditor from '../RichTextEditor/TextEditor';
import classes from './EditPost.module.css';

const EditPost = (props) => {
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
        const postRef = database.ref('posts').child(props.postId);
        async function post () {
            try {
            await postRef.update({content: textEditorData});
            await props.editPostHandler();
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
                <button onClick={props.editPostHandler}>Cancel</button>
                <button onClick={submitFormHandler} type='submit'>Submit</button>
            </div>
        </div>
    );
};

export default EditPost;