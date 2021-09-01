import React, { useState, Fragment } from 'react'
import classes from './Thumbnail.module.css';
import ImageModal from '../UI/ImageModal';
import Backdrop from '../UI/Backdrop';

export default function Thumbnail(props) {
    const [showModal, setShowModal] = useState(false);

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const showModalHandler = () => {
        setShowModal(true);
    }

    return (
        <Fragment>
            <span onClick={showModalHandler}>
                <div className={classes['img-wrap']}>
                    <img src={props.url} alt='project screenshot' />
                </div>
            </span>
            {showModal && <Backdrop onClick={closeModalHandler} />}
            {showModal && 
                <ImageModal>
                    <img className={classes['enlarged-img']} src={props.url} alt='user should upload screenshot of project' />
                </ImageModal>
            }
        </Fragment>
    )
}
