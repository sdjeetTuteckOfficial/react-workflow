import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  styled,
  TextField,
  Typography,
  Button,
  IconButton,
  Chip,
  Fab,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CustomizedDialogs from '../components/Modal/Modal';
import { useForm, Controller } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EmailIcon from '@mui/icons-material/Email';
import PropTypes from 'prop-types';
import { emailValidator } from 'rhf-yup-validator';

const EmailWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #eee',
  padding: '10px',
  borderRadius: '5px',
  background: '#0C2D57',
  marginLeft: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
  display: 'flex',
  alignItems: 'center',
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  marginRight: theme.spacing(2),
  fontFamily: 'Lato',
}));

const schema = yup.object().shape({
  email: emailValidator({
    label: 'Email',
    required: true,
  }),
});

function EmailNode({ data, isConnectable, id }) {
  const [open, setOpen] = useState(false);
  const [emailList, setEmailList] = useState([]);
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
    const newData = { ...formData, id: uuidv4() };
    setEmailList((prevState) => [...prevState, newData]);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinalSubmit = () => {
    console.log(emailList);
    data.onSubmit(emailList, id);
    setOpen(false);
    reset();
  };

  const handleDeleteEmail = (id) => {
    console.log(id);
    setEmailList(emailList.filter((emailObj) => emailObj.id !== id));
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
        <Fab
          size='small'
          aria-label='add'
          color='info'
          onClick={() => setOpen(true)}
        >
          <EmailIcon />
        </Fab>
        {/* <Button
          // type='submit'
          variant='contained'
          sx={{ marginLeft: 2 }}
          color='info'
          onClick={() => setOpen(true)}
        >
          Assign Email
        </Button> */}
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
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box>
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
            </Box>
            <IconButton
              aria-label='delete'
              size='large'
              type='submit'
              sx={{ marginTop: 0.5 }}
              color='info'
            >
              <AddCircleIcon fontSize='inherit' />
            </IconButton>
          </Box>
        </form>
        <Box sx={{ mb: 2 }}>
          {emailList.map((email) => (
            <>
              <Chip
                key={email.id}
                label={email.email}
                onDelete={() => handleDeleteEmail(email.id)}
                sx={{ my: 1 }}
              />
              <br />
            </>
          ))}
        </Box>
        <Box display='flex' justifyContent='right' gap={1}>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleFinalSubmit}
          >
            Submit
          </Button>
        </Box>
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
