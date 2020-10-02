import PropTypes from 'prop-types';
import QRCodeGenerator from 'qrcode';
import React, { createRef, useEffect } from 'react';
import { Box, Paper } from '@material-ui/core';

const QR_CODE_SIZE = 230;

const QRCode = ({ children, ...props }) => {
  const ref = createRef();

  useEffect(() => {
    const options = {
      margin: 0,
      scale: props.scale || null,
      width: QR_CODE_SIZE,
    };

    QRCodeGenerator.toCanvas(ref.current, props.data, options);
  }, [ref, props.scale, props.data]);

  return (
    <Box display="flex" justifyContent="center">
      <Paper>
        <Box alignItems="center" display="flex" flexDirection="column" m={3}>
          {children}
          <Box component="canvas" mt={children ? 3 : 0} ref={ref} />
        </Box>
      </Paper>
    </Box>
  );
};

QRCode.propTypes = {
  children: PropTypes.node,
  data: PropTypes.string.isRequired,
  scale: PropTypes.number,
};

export default React.memo(QRCode);
