import { memo } from 'react';
import PropTypes from 'prop-types';
import { Handle, Position } from 'reactflow';
import { Box, styled } from '@mui/material';

const CircularBox = styled(Box)(() => ({
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  background: '#FF204E',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
}));

function StopNode({
  // data,
  isConnectable,
}) {
  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        id='stop'
        isConnectable={isConnectable}
      />
      <CircularBox>Stop</CircularBox>
    </>
  );
}

StopNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
};

export default memo(StopNode);
