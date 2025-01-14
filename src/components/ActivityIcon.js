import { Badge, CircularProgress, IconButton } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CATEGORIES } from '~/store/activity/reducers';
import { IconNotification } from '~/styles/icons';

const DashboardActivityIcon = () => {
  const { categories, lastSeenAt } = useSelector((state) => {
    return state.activity;
  });

  // Is there any pending transactions?
  const isPending = CATEGORIES.find((category) => {
    return !!categories[category].activities.find((activity) => {
      return activity.isPending;
    });
  });

  // Count how many activities we haven't seen yet
  const count = CATEGORIES.reduce((acc, category) => {
    return (
      acc +
      categories[category].activities.reduce((itemAcc, activity) => {
        return activity.createdAt > lastSeenAt ? itemAcc + 1 : itemAcc;
      }, 0)
    );
  }, 0);

  return (
    <IconButton
      aria-label="Activities"
      component={Link}
      edge="end"
      to="/activities"
    >
      {isPending ? (
        <CircularProgress size={28} />
      ) : (
        <Badge
          badgeContent={count}
          color="primary"
          max={99}
          overlap="rectangular"
        >
          <IconNotification style={{ fontSize: 28 }} />
        </Badge>
      )}
    </IconButton>
  );
};

export default DashboardActivityIcon;
