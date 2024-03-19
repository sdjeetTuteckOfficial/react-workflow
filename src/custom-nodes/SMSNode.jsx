import { useCallback, memo } from 'react';
import { Handle, Position } from 'reactflow';

function SMSNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className='sms-node'>
        <label htmlFor='text'>SMS:</label>
        <input id='text' name='text' onChange={onChange} className='nodrag' />
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(SMSNode);
