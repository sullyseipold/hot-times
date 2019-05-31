import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AlertPage from 'pages/AlertPage';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
import BadgePage from 'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import ButtonPage from 'pages/ButtonPage';
import CardPage from 'pages/CardPage';
import ChartPage from 'pages/ChartPage';
// pages
import DashboardPage from 'pages/DashboardPage';
import DropdownPage from 'pages/DropdownPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ModalPage from 'pages/ModalPage';
import ProgressPage from 'pages/ProgressPage';
import TablePage from 'pages/TablePage';
import TypographyPage from 'pages/TypographyPage';
import WidgetPage from 'pages/WidgetPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { withRouter } from 'react-router';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import './styles/reduction.scss';
import AdminPage from './pages/AdminPage';
import Callback from './Callback/callback';




function HomePage(props) {
  const { authenticated } = props;


  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };




  if (authenticated) {
    const { name } = props.auth.getProfile();
    return (
      <div>
        <h1>Howdy! Glad to see you back, {name}.</h1>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }



  return (

    <div>
      <h1>I don't know you. Please, log in.</h1>
      <button onClick={props.auth.login}>Log in</button>
    </div>
  );
}



const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

// class App extends React.Component {
  
  // render(props) {

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
              path="/login-auth0"
              render={() => (
                <HomePage
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
              path="/"
              layout={MainLayout}
              component={ModalPage}
            /> 
            <LayoutRoute
              exact
              path="/buttons"
              layout={MainLayout}
              component={ButtonPage}
            />
            <LayoutRoute
              exact
              path="/cards"
              layout={MainLayout}
              component={CardPage}
            />
            <LayoutRoute
              exact
              path="/widgets"
              layout={MainLayout}
              component={WidgetPage}
            />
            <LayoutRoute
              exact
              path="/typography"
              layout={MainLayout}
              component={TypographyPage}
            />
            <LayoutRoute
              exact
              path="/alerts"
              layout={MainLayout}
              component={AlertPage}
            />
            <LayoutRoute
              exact
              path="/tables"
              layout={MainLayout}
              component={TablePage}
            />
            <LayoutRoute
              exact
              path="/badges"
              layout={MainLayout}
              component={BadgePage}
            />
            <LayoutRoute
              exact
              path="/button-groups"
              layout={MainLayout}
              component={ButtonGroupPage}
            />
            <LayoutRoute
              exact
              path="/dropdowns"
              layout={MainLayout}
              component={DropdownPage}
            />
            <LayoutRoute
              exact
              path="/progress"
              layout={MainLayout}
              component={ProgressPage}
            />
            <LayoutRoute
              exact
              path="/modals"
              layout={MainLayout}
              component={ModalPage}
            />
            <LayoutRoute
              exact
              path="/forms"
              layout={MainLayout}
              component={FormPage}
            />
            <LayoutRoute
              exact
              path="/input-groups"
              layout={MainLayout}
              component={InputGroupPage}
            />
            <LayoutRoute
              exact
              path="/charts"
              layout={MainLayout}
              component={ChartPage}
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
              component={AdminPage}
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
