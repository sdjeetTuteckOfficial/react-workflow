import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, styled, TextField, Typography, Button } from '@mui/material';
import CustomizedDialogs from '../components/Modal/Modal';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

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

const schema = yup.object().shape({
  email: yup.string().required('First name is required'),
});

function EmailNode({ data, isConnectable, id }) {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formData) => {
    console.log('data', formData);
    const newData = { formData: formData };
    data.onSubmit(newData, id);
    setOpen(false);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <EmailWrapper>
        <LabelTypography variant='label' htmlFor='text'>
          Send Email:
        </LabelTypography>
        <Button
          // type='submit'
          variant='contained'
          sx={{ marginLeft: 2 }}
          color='info'
          onClick={() => setOpen(true)}
        >
          Assign Email
        </Button>
      </EmailWrapper>

      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
        style={{ background: 'red' }}
      />

      <CustomizedDialogs
        open={open}
        modalTitle='Email Details'
        handleClose={handleClose}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Typography sx={{ mb: 1 }}>Enter Email:</Typography>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                fullWidth
                size='small'
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ''}
                sx={{ marginBottom: 2, minWidth: 300 }}
              />
            )}
          />

          <Box display='flex' justifyContent='right' gap={1}>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Box>
        </form>
      </CustomizedDialogs>
    </>
  );
}

export default memo(EmailNode);

EmailNode.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
