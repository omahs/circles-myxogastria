import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { Fab, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { IconSend } from '~/styles/icons';

const useStyles = makeStyles((theme) => ({
  fabSend: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: theme.custom.gradients.purple,
  },
  fabSendDisabled: {
    background: theme.custom.gradients.gray,
  },
  fabSendIcon: {
    position: 'relative',
    top: 1,
    left: -1,
  },
}));

// eslint-disable-next-line react/display-name
const ButtonSend = React.forwardRef(
  ({ className, disabled = false, isPending = false, ...props }, ref) => {
    const classes = useStyles();

    return (
      <Fab
        aria-label="Send"
        className={clsx(classes.fabSend, className, {
          [classes.fabSendDisabled]: disabled,
        })}
        color="primary"
        component={Link}
        disabled={disabled || isPending}
        ref={ref}
        style={disabled ? { pointerEvents: 'initial' } : {}}
        {...props}
      >
        {isPending ? (
          <CircularProgress size={24} />
        ) : (
          <IconSend className={classes.fabSendIcon} />
        )}
      </Fab>
    );
  },
);

ButtonSend.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isPending: PropTypes.bool,
};

export default ButtonSend;