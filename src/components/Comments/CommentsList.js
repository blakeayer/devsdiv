// import React, { Fragment, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import useHttp from '../../hooks/useHttp';
// import { getAllComments } from '../../lib/api';

// import LoadingSpinner from '../UI/LoadingSpinner';
// import CommentDetail from './CommentDetail';
// import Card from '../UI/Card';
// import classes from './CommentsList.module.css';
// import Thumbnail from '../UI/Thumbnail';
// import { Link } from 'react-router-dom';

// const CommentsList = () => {

//     const params = useParams();
//     const { postId } = params;
//     const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments);

//     useEffect(() => {
//         sendRequest(postId);
//     }, [sendRequest, postId, loadedComments])

//     if (status === 'pending') {
//         return <div className={classes.center}>
//             <LoadingSpinner />
//         </div>
//     }
//     if (error) {
//         return <p className={classes.center}>
//             {error}
//         </p>
//     }
//     if (status === 'completed' && 
//         (!loadedComments || loadedComments.length === 0)) {
//             return (
//                 <div className={classes.center}>
//                     <p className={classes.center}>
//                         No comments.
//                     </p>
//                 </div>
//             );
//     }

//     if (status === 'completed' && loadedComments) {
//         // console.log(loadedComments);
//         return (
//             <Fragment>
//                 <ul className={classes.list}>
//                     {loadedComments.map((comment) => (
//                         <div className={classes.listItemWrapper} key={comment.id}>
//                             <Card>
//                                 <div className={classes['container-row']}>
                                    
//                                     <div className={classes.thumbnail}>
//                                         <Thumbnail url={comment.url} />
//                                     </div>
                                    
//                                     <div className={classes.listItem} >
//                                         <Link to={`${comment.channel}/${comment.id}`}>
                                    
//                                             <CommentDetail
//                                                 key={comment.id}
//                                                 id={comment.postId}
//                                                 uri={comment.id}
//                                                 author={comment.author}
//                                                 dateTime={comment.dateTime.toLocaleString('en-US', {dateStyle:'short', timeStyle: 'long'})}
//                                                 title={comment.title}
//                                                 content={comment.content}
//                                                 url={comment.url}
//                                                 channel={comment.channel}
//                                             />
//                                         </Link>
//                                     </div>
                                
//                                 </div>
//                             </Card>
//                         </div>
//                     ))}
//                 </ul>
//             </Fragment>
//         );
//     }
// };

// export default CommentsList;


import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import { getAllComments } from '../../lib/api';

import CommentDetail from './CommentDetail';
import Thumbnail from '../UI/Thumbnail';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
    const params = useParams();
    const { postId } = params;
    const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(postId);
    }, [sendRequest, postId], loadedComments)

    if (status === 'pending') {
        return <div className='center'>
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <p className='center'>
            {error}
        </p>
    }
    if (status === 'completed' && 
        (!loadedComments || loadedComments.length === 0)) {
            return (
                <div className='center'>
                    <p className='center'>
                        No comments.
                    </p>
                </div>
            );
    }

    if (status === 'completed' && loadedComments) {
        // console.log(loadedComments);
        return (
            <Fragment>
                <ul className={classes.list}>
                    {loadedComments.map((comment) => (
                        <div className={classes.listItemWrapper} key={comment.Id}>      
                            <Card key={comment.Id}>

                                <div className={classes['container-row']}>

                                    <div className={classes.thumbnail}>
                                        <Thumbnail url={comment.url} />
                                    </div>

                                    <div className={classes.listItem} >
                                        <CommentDetail
                                            id={comment.postId}
                                            key={comment.id}
                                            uri={comment.id}
                                            url={comment.url}
                                            author={comment.author}
                                            dateTime={comment.dateTime.toLocaleString('en-US', {dateStyle:'short', timeStyle: 'long'})}
                                            title={comment.title}
                                            content={comment.content}
                                            channel={comment.channel}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </ul>
            </Fragment>
        );
    }

    return <div></div>;
};

export default CommentsList;