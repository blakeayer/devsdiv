import React, { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Home from './pages/Home'
import Channel from './pages/Channel';
import ActivePost from './pages/ActivePost';
import UserProfile from './pages/UserProfile';
import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/signin">
              <SignIn />
            </Route>
          )}
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/:channel" exact>
            <Channel />
          </Route>

          {/* MAKE DOUBLE NESTED PATH FOR REACT/JS/PY */}
          <Route path="/:channel/:postId">
            <ActivePost />
          </Route>

            <Route path='/profile'>
              {authCtx.isLoggedIn && <UserProfile />}
              {!authCtx.isLoggedIn && <Redirect to='/signin' />}
            </Route>
          <Route path='*'>
            <Redirect to='/home' />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
