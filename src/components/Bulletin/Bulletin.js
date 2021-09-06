import React, { Fragment } from 'react'
import Card from '../UI/Card';
import classes from './Bulletin.module.css'

const Bulletin = () => {
    return (
        <Fragment>
            <h2 className={'title'}>Bulletin</h2>
            <Card>
                <div className='left'>
                    <div className={classes.intro}>
                        <h4>Introduction</h4>
                        <p>Welcome and thank you for visiting!</p>
                        <p>DevsDiv is a play on the words "developer" and "division."  A &lt;div&gt; as any front-end developer can tell you, is a container for code.  Therefore, I created DevsDiv to be a container (div) for me (a dev) to place my code.</p>
                        <p>DevsDiv was built with React, utilizing React-Router for navigation, Draft.js for text editing, and Firebase as a back-end.  In the near future, I have plans to implement Next.js for server-side rendering and probably React-Bootstrap for styling although I'm considering Styled-Components.</p>
                        <p>Anyone interested in checking out the code can do so at: <a href='https:/github.com/blakeayer/devsdiv'>https:/github.com/blakeayer/devsdiv</a></p>
                    </div>
                    <p>TODO List:</p>
                    <ul>
                        <li>Improve WYSIWYG functionality</li>
                        <li>Add user profile page</li>
                        <li>Add pagination</li>
                        <li>Implement styling and icon libraries</li>
                        <li>Improve responsiveness and accessibility</li>
                        <li>Improve form validation</li>
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
