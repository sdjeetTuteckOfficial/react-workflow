import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, styled } from '@mui/material';
import PropTypes from 'prop-types';

const ConditionBox = styled(Box)(() => ({
  display: 'block',
}));

const ConditionalNodeWrap = styled(Box)(() => ({
  width: '60px',
  height: '60px',
  transform: 'rotate(45deg)',
  background: '#ffd700',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
}));

const ConditionalHeader = styled(Box)(() => ({
  transform: 'rotate(-45deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));

function ConditionalNode({ data, isConnectable, id }) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);
  console.log('data', data, id);

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

ConditionalNode.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
