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
                    <div className={classes.todo}>
                        <h4>TODO List:</h4>
                        <ul>
                            <li>CreatePost should route to newly made post</li>
                            <li>EditPost needs to refresh after fetch request succeeds, possibly implement history.replace(current dir)</li>
                            <li>Add footer</li>
                            <li>Improve WYSIWYG functionality</li>
                            <li>Add user profile page</li>
                            <li>Add pagination</li>
                            <li>Implement styling and icon libraries</li>
                            <li>Improve responsiveness and accessibility</li>
                            <li>Improve form validation</li>
                            <li>...</li>
                        </ul>
                    </div>
                    <div className={classes.bugs}>
                        <h4>Known Bugs:</h4>
                        <ul>
                            <li>Long, unbroken strings (such as URLs) do not wrap at 750px, but begin wrapping at lower resolutions </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default Bulletin;
