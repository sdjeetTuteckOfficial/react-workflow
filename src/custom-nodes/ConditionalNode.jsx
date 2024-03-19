import { useCallback, memo } from 'react';
import { Handle, Position } from 'reactflow';

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
      />
      <div className='conditional-container'>
        <div className='conditional-node'>
          <div className='conditional-mode__header'>
            <h3>Condition</h3>
          </div>
        </div>
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        id='conditional_yes'
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='conditional_no'
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(ConditionalNode);
