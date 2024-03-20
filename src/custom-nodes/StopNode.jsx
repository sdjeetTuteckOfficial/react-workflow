import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, styled } from '@mui/material';

const CircularBox = styled(Box)(({ theme }) => ({
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  background: '#FF204E',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function StopNode({ data, isConnectable }) {
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

export default memo(StopNode);
