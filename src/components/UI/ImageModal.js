import React from 'react';

import classes from './ImageModal.module.css';


const Modal = (props) => {

    return (
            <div className={classes.modal}>{props.children}</div>
    );
};

export default Modal;







// return (
//     <div className={classes.modal}>
//         <div className={classes.center}>
//             <form onSubmit={addPostHandler}>
//                 <div>
//                     <div>
//                         <label htmlFor='title'>Title: </label>
//                         <input 
//                             type='text' 
//                             id='title' 
//                             ref={titleInputRef} 
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor='content'>Comment: </label>
//                         <textarea 
//                             rows='5' 
//                             id='content' 
//                             ref={contentInputRef} 
//                         />
//                     </div>
//                 </div>
//                 {/* <div>
//                     <button>Upload</button>
//                 </div> */}
//                 <Link to='/home'tabIndex='-1'>
//                     <button onClick={props.onClose}>
//                         Cancel
//                     </button>
//                 </Link>
//                 <Link to='/home' tabIndex='-1'>
//                     <button onClick={props.onClose}>
//                         Submit
//                     </button>
//                 </Link>
//             </form>
//         </div>
//     </div>
// );