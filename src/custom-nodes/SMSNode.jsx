import { useCallback, memo, useState } from 'react';
import { Handle, Position, useNodesState } from 'reactflow';
import { Box, styled, Typography, TextField, Button } from '@mui/material';

const SMSWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #eee',
  padding: '10px', // Increased padding for spacing
  borderRadius: '5px',
  background: '#6f509e',
  marginLeft: theme.spacing(2),
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  marginRight: theme.spacing(2),
  fontFamily: 'Lato',
}));

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
      data.onSubmit(newData, id);
    },
    [formData]
  );

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <SMSWrapper>
        <form onSubmit={onSubmit}>
          <LabelTypography variant='label' htmlFor='text'>
            SMS:
          </LabelTypography>
          <TextField
            id='text'
            name='text'
            onChange={onChange}
            className='nodrag'
            size='small'
          />
          <Button type='submit' variant='contained' sx={{ marginLeft: 2 }}>
            Submit
          </Button>
        </form>
      </SMSWrapper>
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
