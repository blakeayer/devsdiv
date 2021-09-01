import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db, increment } from '../../firebase/firebase'

import useHttp from '../../hooks/useHttp';
import { addPost } from '../../lib/api';

import Modal from '../UI/Modal';
import Backdrop from '../UI/Backdrop'
import LoadingSpinner from '../UI/LoadingSpinner';
import TextEditor from '../RichTextEditor/TextEditor';
import ProgressBar from '../UI/ProgressBar';

import classes from './CreatePost.module.css'
import { useAuth } from '../../store/AuthContext' 

const CreatePost = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState();
    const [error, setError] = useState(null);
    const [textEditorData, setTextEditorData] = useState('');
    const { sendRequest, status } = useHttp(addPost);
    const history = useHistory();
    const titleInputRef = useRef();
    const { currentUser } = useAuth();
    
    var docRef = db.collection("increment").doc("postCounter");

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");

        
    const imgChangeHandler = (event) => {
        let selected = event.target.files[0];
        const types = ['image/png', 'image/jpeg'];

        if (selected && types.includes(selected.type)) {
            setImage(selected);
            setError('');
        } else {
            setImage(null);
            setError('Please select an image file (png or jpeg).');
        }
    };

    const passUrl = (url) => {
        setImageURL(url)
    };
    
    //MODAL LOGIC (move to <Modal />?
    const showModalHandler = () => {
        setShowModal(true);
    };
    const closeModalHandler = () => {
        setShowModal(false);
        setImage(null);
        setError('');
    };

    //GET RICH TEXT EDITOR DATA AS JSON STRING
    const passJsonData = (jsonString) => {
        setTextEditorData(jsonString)
    };
    
    useEffect(() => {
        // console.log(textEditorData);
    }, [textEditorData])

    //MANAGE HTTP REQUEST
    useEffect(() => {
        if (status === 'completed') {
            history.replace(`/${props.channel}`)
        }
    }, [status, history, props.channel]);
    
    const submitFormHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const enteredTitle = titleInputRef.current.value;
        const enteredContent = textEditorData;
        const today = new Date();
        var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var dateTime = date + ' ' + time;

        //TODO: Add Validation here
        
        async function post() {
            try {
                await docRef.update({ count: increment});
                const getDoc = await docRef.get();
                const getPostId = await getDoc.data().count;
                await sendRequest({
                    postId: getPostId,
                    channel: props.channel,
                    content: enteredContent,
                    url: imageURL,
                    dateTime: dateTime,
                    author: currentUser.email,
                    title: enteredTitle,
                });
                await props.onAddedPost();
            } catch (err) {
                alert(err);
            }
        }

        post();

        setShowModal(false);
        setIsLoading(false);
    };

    return (
        <Fragment>
            <div className={classes.center}>
                    <span className={classes.link} onClick={showModalHandler}>
                        [ New Post ]
                    </span>
            </div>
            {showModal && <Backdrop onClick={closeModalHandler} />}
            {showModal && 
                <Modal> 
                    <div className={classes.center}>
                        
                        {isLoading && 
                            <div className={classes.loading}>
                                <LoadingSpinner />
                            </div>}
                        
                        <form>

                            <div className={classes.formControls}>

                                <div className={classes.formControl}>
                                    <input 
                                        placeholder='Title'
                                        type='text' 
                                        id='title' 
                                        ref={titleInputRef} 
                                    />
                                </div>
                                
                                <div className={classes.formControl}>
                                    <div className='CreatePost'>
                                        <TextEditor passJsonData={passJsonData} />  
                                    </div>
                                </div>

                            </div>

                            <div className={classes.formActions}>
                                <input type="file" onChange={imgChangeHandler} />
                            </div>
                                { error && <div className={classes.error}>{error}</div> }
                                { image && <div className={classes['img-name']}>{image.name}</div>}
                                { image && <ProgressBar image={image} setImage={setImage} passUrl={passUrl} />}
                            
                            
                            <button onClick={closeModalHandler}>Cancel</button>
                            <button onClick={submitFormHandler} type='submit'>Submit</button>

                        </form>
                    </div>
                </Modal>}
        </Fragment>
    );
};

export default CreatePost;