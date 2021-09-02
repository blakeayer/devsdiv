import React, { Fragment } from 'react'
import Card from '../UI/Card';

const Bulletin = () => {
    return (
        <Fragment>
            <h2>Bulletin</h2>
            <Card>
                <div className='left'>
                    <p> Thank you for visiting!  This site is still in its beta.  Your patience is appreciated!</p>
                    <p>TODO List:</p>
                    <ul>
                        <li>Add edit post functionality</li>
                        <li>Add user profile page</li>
                        <li>Add pagination</li>
                        <li>Cleanup/reduce unnecessary/redundant CSS</li>
                        <li>Improve responsiveness</li>
                        <li>...</li>
                    </ul>
                    <p>Known Bugs:</p>
                    <ul>
                        <li>All fixed.</li>
                    </ul>
                </div>
            </Card>
        </Fragment>
    )
}

export default Bulletin;
