import { useCallback, memo } from 'react';
import { Handle, Position } from 'reactflow';

function EmailNode({ data, isConnectable }) {
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
      <div className='text-updater-node'>
        <label htmlFor='text'>Email:</label>
        <input id='text' name='text' onChange={onChange} className='nodrag' />
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
      />
      {/* <Handle
        type='source'
        position={Position.Bottom}
        id='b'
        isConnectable={isConnectable}
      /> */}
    </>
  );
}

export default memo(EmailNode);
