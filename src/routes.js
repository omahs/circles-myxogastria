import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from '~/views/Dashboard';
import Devices from '~/views/Devices';
import Error from '~/views/Error';
import Login from '~/views/Login';
import LoginSeedPhrase from '~/views/LoginSeedPhrase';
import NotFound from '~/views/NotFound';
import Onboarding from '~/views/Onboarding';
import Profile from '~/views/Profile';
import SeedPhrase from '~/views/SeedPhrase';
import Send from '~/views/Send';
import SendConfirm from '~/views/SendConfirm';
import Share from '~/views/Share';
import TutorialOnboarding from '~/views/TutorialOnboarding';
import Validation from '~/views/Validation';
import ValidationLock from '~/views/ValidationLock';
import ValidationShare from '~/views/ValidationShare';
import Welcome from '~/views/Welcome';
import { ACCOUNT_CREATE } from '~/store/tutorial/actions';

// Routes in Drawer component
export const ACTIVITIES_PATH = '/activities';
export const MY_PROFILE_PATH = '/profile';
export const SEARCH_PATH = '/search';

// Main routes
export const WELCOME_PATH = '/welcome';
export const LOGIN_PATH = '/welcome/login';
export const LOGIN_SEED_PHRASE_PATH = '/welcome/seedphrase';
export const ONBOARDING_PATH = '/welcome/onboarding';
export const VALIDATION_PATH = '/validation';
export const VALIDATION_SHARE_PATH = '/validation/share';
export const DASHBOARD_PATH = '/';
export const DEVICES_PATH = '/devices';
export const PROFILE_PATH = '/profile/:address';
export const SEED_PHRASE_PATH = '/seedphrase';
export const SEND_CONFIRM_PATH = '/send/:address';
export const SEND_PATH = '/send';
export const SHARE_PATH = '/share';

const SessionContainer = ({
  component: Component,
  isAuthorizationRequired = false,
  isValidationRequired = false,
}) => {
  const app = useSelector((state) => state.app);
  let isValid = true;

  // Check if user has a valid session ..
  //
  // 1. Do we have (predicted) Safe address?
  // 2. Do we have Wallet?
  if (isAuthorizationRequired && !app.isAuthorized) {
    isValid = false;
  }

  if (!isAuthorizationRequired && app.isAuthorized) {
    isValid = false;
  }

  // Check if user is validated ...
  //
  // 1. Is the Safe deployed (nonce is not set)?
  // 2. Do we have a Token address (Token contract is deployed)?
  if (isValidationRequired && isAuthorizationRequired && !app.isValidated) {
    isValid = false;
  }

  if (!isValidationRequired && isAuthorizationRequired && app.isValidated) {
    isValid = false;
  }

  if (isValid) {
    return <Component />;
  }

  // Redirect to fallback routes ..
  if (app.isAuthorized) {
    if (isValidationRequired) {
      return <Redirect to={VALIDATION_PATH} />;
    }

    return <Redirect to={DASHBOARD_PATH} />;
  }

  return <Redirect to={WELCOME_PATH} />;
};

// Containers for routes with different permissions

const OnboardingRoute = ({ component, path }) => {
  return (
    <Route path={path}>
      <SessionContainer component={component} />
    </Route>
  );
};

const SessionRoute = ({ component, path }) => {
  return (
    <Route path={path}>
      <SessionContainer component={component} isAuthorizationRequired />
    </Route>
  );
};

const TrustedRoute = ({ component, path }) => {
  return (
    <Route path={path}>
      <SessionContainer
        component={component}
        isAuthorizationRequired
        isValidationRequired
      />
    </Route>
  );
};

// Containers for Tutorials

const TutorialContainer = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { isFinished } = useSelector((state) => {
    return state.tutorial[props.name];
  });

  if (redirect) {
    return <Redirect push to={props.exitPath} />;
  }

  if (!isFinished) {
    const onExit = () => {
      setRedirect(true);
    };

    const TutorialComponent = props.componentTutorial;
    return <TutorialComponent onExit={onExit} />;
  }

  const FinalComponent = props.componentFinal;
  return <FinalComponent />;
};

const OnboardingContainer = () => {
  return (
    <TutorialContainer
      componentFinal={Onboarding}
      componentTutorial={TutorialOnboarding}
      exitPath={WELCOME_PATH}
      name={ACCOUNT_CREATE}
    />
  );
};

// Routes

const Routes = () => {
  const location = useLocation();
  const { app, safe } = useSelector((state) => state);

  // Did something bad happen?
  if (app.isError) {
    return <Error />;
  }

  // Do not do anything yet when we are not ready
  if (!app.isReady) {
    return null;
  }

  // Show locked view when Safe is being deployed
  if (safe.pendingIsLocked) {
    return <ValidationLock />;
  }

  return (
    <Switch location={location}>
      <OnboardingRoute component={Welcome} exact path={WELCOME_PATH} />
      <OnboardingRoute
        component={OnboardingContainer}
        exact
        path={ONBOARDING_PATH}
      />
      <OnboardingRoute component={Login} exact path={LOGIN_PATH} />
      <OnboardingRoute
        component={LoginSeedPhrase}
        exact
        path={LOGIN_SEED_PHRASE_PATH}
      />
      <SessionRoute component={Validation} exact path={VALIDATION_PATH} />
      <SessionRoute
        component={ValidationShare}
        exact
        path={VALIDATION_SHARE_PATH}
      />
      <TrustedRoute component={Send} exact path={SEND_PATH} />
      <TrustedRoute component={SendConfirm} exact path={SEND_CONFIRM_PATH} />
      <TrustedRoute component={Devices} exact path={DEVICES_PATH} />
      <TrustedRoute component={SeedPhrase} exact path={SEED_PHRASE_PATH} />
      <TrustedRoute component={Share} exact path={SHARE_PATH} />
      <TrustedRoute component={Profile} exact path={PROFILE_PATH} />
      <TrustedRoute component={Dashboard} path={DASHBOARD_PATH} />
      <Route component={NotFound} />
    </Switch>
  );
};

SessionContainer.propTypes = {
  component: PropTypes.elementType.isRequired,
  isAuthorizationRequired: PropTypes.bool,
  isValidationRequired: PropTypes.bool,
};

OnboardingRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

SessionRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

TrustedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

TutorialContainer.propTypes = {
  componentFinal: PropTypes.elementType.isRequired,
  componentTutorial: PropTypes.elementType.isRequired,
  exitPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Routes;
