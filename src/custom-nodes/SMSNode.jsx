import { useCallback, memo, useState } from 'react';
import { Handle, Position, useNodesState } from 'reactflow';

function SMSNode({ data, isConnectable, id }) {
  const [formData, setFormData] = useState('');

  const onChange = useCallback((evt) => {
    setFormData(evt.target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newData = { formData: formData };
      console.log('New node data:', newData);
      data.onSubmit(newData);
    },
    [formData]
  );

  return (
    <>
      {console.log('data', data, id)}
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className='sms-node'>
        <form onSubmit={onSubmit}>
          <label htmlFor='text'>SMS:</label>
          <input
            id='text'
            name='text'
            className='nodrag'
            onChange={onChange}
            value={formData}
          />
          <button type='submit'>Submit</button>
        </form>
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
