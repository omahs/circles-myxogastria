import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from '~/components/Avatar';
import { useRelativeProfileLink } from '~/hooks/url';

const LastInteractions = () => {
  const { network } = useSelector((state) => state.trust);

  return (
    <Grid alignItems="center" container justify="center" spacing={1}>
      {network.map((connection) => {
        return (
          <LastInteractionsAccount
            address={connection.safeAddress}
            key={connection.safeAddress}
          />
        );
      })}
    </Grid>
  );
};

const LastInteractionsAccount = ({ address }) => {
  const profilePath = useRelativeProfileLink(address);

  return (
    <Grid item>
      <Link to={profilePath}>
        <Avatar address={address} size="medium" />
      </Link>
    </Grid>
  );
};

LastInteractionsAccount.propTypes = {
  address: PropTypes.string.isRequired,
};

export default LastInteractions;