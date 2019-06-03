import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
// pages
import React from 'react';
import componentQueries from 'react-component-queries';
import { withRouter } from 'react-router';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import './styles/reduction.scss';
import ModalPage from './pages/ModalPage';
import AdminPage from './pages/AdminPage';
import Callback from './Callback/callback';
import HomePage from './Homepage/Homepage';
import Profile from './Profile/Profile';


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

  function App(props) {
    const authenticated = props.auth.isAuthenticated();

    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <Route
              exact
              path="/callback"
              render={() => <Callback auth={props.auth} />}
            />
            <Route
              exact
              path="/"
              render={() => (
                <HomePage
                  authenticated={authenticated}
                  auth={props.auth}
                  history={props.history}
                />
              )}
            />
            <Route
              exact
              path="/profile"

              render={() => (
                <Profile
                  authenticated={authenticated}
                  auth={props.auth}
                  history={props.history}
                />
              )}
            />
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/login-modal"
              layout={MainLayout}
              component={AuthModalPage}
            />
            <LayoutRoute
              exact
              path="/modalpage"
              layout={MainLayout}
              component={ModalPage}
            /> 
            <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            />
            <LayoutRoute
              exact
              path="/admin"
              layout={MainLayout}
              component={props => (
                <AdminPage {...props} authenticated={true}
                />
              )}
              />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }


export default withRouter(App);

// const query = ({ width }) => {
//   if (width < 575) {
//     return { breakpoint: 'xs' };
//   }

//   if (576 < width && width < 767) {
//     return { breakpoint: 'sm' };
//   }

//   if (768 < width && width < 991) {
//     return { breakpoint: 'md' };
//   }

//   if (992 < width && width < 1199) {
//     return { breakpoint: 'lg' };
//   }

//   if (width > 1200) {
//     return { breakpoint: 'xl' };
//   }

//   return { breakpoint: 'xs' };
// };

// export default componentQueries(query)(App);
