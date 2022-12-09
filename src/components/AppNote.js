import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import theme from '../styles/theme';

import HumbleAlert from '~/components/HumbleAlert';

const useStyles = makeStyles(() => ({
  appNoteContainer: {
    position: 'relative',
  },
}));

const notification = {
  validation: {
    color: process.env.USER_NOTIFICATION_VALIDATION_COLOR,
    icon: process.env.USER_NOTIFICATION_VALIDATION_ICON,
    text: process.env.USER_NOTIFICATION_VALIDATION,
  },
  dashboard: {
    color: process.env.USER_NOTIFICATION_DASHBOARD_COLOR,
    icon: process.env.USER_NOTIFICATION_DASHBOARD_ICON,
    text: process.env.USER_NOTIFICATION_DASHBOARD,
  },
  default: {
    color:
      process.env.USER_NOTIFICATION_COLOR || theme.custom.colors.fountainBlue,
    icon: process.env.USER_NOTIFICATION_ICON || 'IconAlert',
    text: process.env.USER_NOTIFICATION,
  },
  error: {
    color: process.env.USER_NOTIFICATION_ERROR_COLOR,
    icon: process.env.USER_NOTIFICATION_ERROR_ICON,
    text: process.env.USER_NOTIFICATION_ERROR,
  },
  login: {
    color: process.env.USER_NOTIFICATION_LOGIN_COLOR,
    icon: process.env.USER_NOTIFICATION_LOGIN_ICON,
    text: process.env.USER_NOTIFICATION_LOGIN,
  },
  onboarding: {
    color: process.env.USER_NOTIFICATION_ONBOARDING_COLOR,
    icon: process.env.USER_NOTIFICATION_ONBOARDING_ICON,
    text: process.env.USER_NOTIFICATION_ONBOARDING,
  },
};

const AppNote = ({ messageVersion }) => {
  const classes = useStyles();
  const choice = messageVersion ? messageVersion : 'default';
  const message = notification[choice].text
    ? notification[choice].text
    : notification['default'].text;
  const color = notification[choice].color
    ? notification[choice].color
    : notification['default'].color;
  const icon = notification[choice].icon
    ? notification[choice].icon
    : notification['default'].icon;

  return message ? (
    <Box className={classes.appNoteContainer} my={2}>
      <HumbleAlert color={color} icon={icon}>
        {message}
      </HumbleAlert>
    </Box>
  ) : null;
};

AppNote.propTypes = {
  messageVersion: PropTypes.string,
};

export default AppNote;
