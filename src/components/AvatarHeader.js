import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MY_PROFILE_PATH } from '~/routes';

import Avatar from '~/components/Avatar';
import UsernameDisplay from '~/components/UsernameDisplay';

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    height: '80px',
    margin: '0 auto',
    width: '80px',
  },
  userDataContainer: {
    top: '45px',
    position: 'relative',
    margin: '0 auto',
  },
  textContainer: {
    textAlign: 'center',
    marginTop: '8px',

    '& a': {
      fontSize: '18px',
      textDecoration: 'none',
      color: theme.custom.colors.black,
      fontWeight: 'black',
    },
  },
}));

const AvatarHeader = ({
  hideImage,
  hidePlusIcon,
  username,
  useCache = true,
  withClickEffect,
  withHoverEffect,
}) => {
  const classes = useStyles();

  const safe = useSelector((state) => state.safe);

  const displayedUsername = username ? (
    `@${username}`
  ) : safe.currentAccount ? (
    <UsernameDisplay address={safe.currentAccount} useCache={useCache} />
  ) : safe.pendingAddress ? (
    <UsernameDisplay address={safe.pendingAddress} useCache={useCache} />
  ) : null;

  return (
    <Box className={classes.userDataContainer}>
      <Box className={classes.avatarContainer}>
        {!hideImage && (
          <Link to={MY_PROFILE_PATH}>
            <Avatar
              address={safe.currentAccount || safe.pendingAddress}
              className={classes.avatarContainer}
              hidePlusIcon={hidePlusIcon}
              size={'smallXl'}
              useCache={useCache}
              withClickEffect={withClickEffect}
              withHoverEffect={withHoverEffect}
            />
          </Link>
        )}
      </Box>
      <Box className={classes.textContainer}>
        <Link className={classes.profileLink} to={MY_PROFILE_PATH}>
          {displayedUsername}
        </Link>
      </Box>
    </Box>
  );
};

AvatarHeader.propTypes = {
  hideImage: PropTypes.bool,
  hidePlusIcon: PropTypes.bool,
  useCache: PropTypes.bool,
  username: PropTypes.string,
  withClickEffect: PropTypes.bool,
  withHoverEffect: PropTypes.bool,
};

export default AvatarHeader;
