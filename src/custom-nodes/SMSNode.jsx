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
import MessageIcon from '@mui/icons-material/Message';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

const SMSWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #eee',
  padding: '10px',
  borderRadius: '5px',
  background: '#6F509E',
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
  phoneNumber: yup.string().required('First name is required'),
});

function SMSNode({ data, isConnectable, id }) {
  const [open, setOpen] = useState(false);
  const [phoneNumberList, setPhoneNumberList] = useState([]);
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
    setPhoneNumberList((prevState) => [...prevState, newData]);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinalSubmit = () => {
    console.log(phoneNumberList);
    data.onSubmit(phoneNumberList, id);
    setOpen(false);
    reset();
  };

  const handleDeleteEmail = (id) => {
    console.log(id);
    setPhoneNumberList(
      phoneNumberList.filter((emailObj) => emailObj.id !== id)
    );
  };

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <SMSWrapper>
        <LabelTypography variant='label' htmlFor='text'>
          Send SMS:
        </LabelTypography>
        <Fab
          color='primary'
          size='small'
          aria-label='add'
          onClick={() => setOpen(true)}
        >
          <MessageIcon />
        </Fab>
        {/* <Button
          // type='submit'
          variant='contained'
          sx={{ marginLeft: 2 }}
          color='primary'
          onClick={() => setOpen(true)}
        >
          Assign Number
        </Button> */}
      </SMSWrapper>

      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
        style={{ background: 'red' }}
      />

      <CustomizedDialogs
        open={open}
        modalTitle='Add phone number'
        handleClose={handleClose}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box>
              <Typography sx={{ mb: 1 }}>Enter Phone Number:</Typography>
              <Controller
                name='phoneNumber'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    fullWidth
                    size='small'
                    error={Boolean(errors.phoneNumber)}
                    helperText={
                      errors.phoneNumber ? errors.phoneNumber.message : ''
                    }
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
          {phoneNumberList.map((ele) => (
            <>
              <Chip
                key={ele.id}
                label={ele.phoneNumber}
                onDelete={() => handleDeleteEmail(ele.id)}
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

export default memo(SMSNode);

SMSNode.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
