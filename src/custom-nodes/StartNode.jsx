import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, styled } from '@mui/material';

const CircularBox = styled(Box)(({ theme }) => ({
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  background: '#007F73',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function StartNode({ data, isConnectable }) {
  return (
    <>
      <CircularBox>Start</CircularBox>
      <Handle
        type='source'
        position={Position.Bottom}
        id='start'
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(StartNode);
