import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, styled } from '@mui/material';

const ConditionBox = styled(Box)(() => ({
  display: 'block',
}));

const ConditionalNodeWrap = styled(Box)(() => ({
  width: '60px',
  height: '60px',
  transform: 'rotate(45deg)',
  background: '#ffd700',
}));

const ConditionalHeader = styled(Box)(() => ({
  transform: 'rotate(-45deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));

function ConditionalNode({ data, isConnectable }) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ zIndex: 6 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ConditionBox>
          <ConditionalNodeWrap>
            <ConditionalHeader>
              <h6>Condition</h6>
            </ConditionalHeader>
          </ConditionalNodeWrap>
        </ConditionBox>
        <Handle
          type='source'
          position={Position.Bottom}
          id='conditional_no'
          isConnectable={isConnectable}
          style={{ background: 'red' }}
        />
        <Handle
          type='source'
          position={Position.Right}
          id='conditional_yes'
          isConnectable={isConnectable}
          style={{ background: 'green' }}
        />
      </Box>
    </>
  );
}

export default memo(ConditionalNode);
