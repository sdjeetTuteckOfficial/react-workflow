import { useCallback, memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, styled, TextField, Typography, Button } from '@mui/material';

const EmailWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #eee',
  padding: '10px',
  borderRadius: '5px',
  background: '#0C2D57',
  marginLeft: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  marginRight: theme.spacing(2),
  fontFamily: 'Lato',
}));

function EmailNode({ data, isConnectable }) {
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
      <EmailWrapper>
        <form onSubmit={onSubmit}>
          <LabelTypography variant='label' htmlFor='text'>
            Email:
          </LabelTypography>
          <TextField
            id='text'
            name='text'
            onChange={onChange}
            className='nodrag'
            size='small'
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ marginLeft: 2 }}
            color='info'
          >
            Submit
          </Button>
        </form>
      </EmailWrapper>

      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(EmailNode);
