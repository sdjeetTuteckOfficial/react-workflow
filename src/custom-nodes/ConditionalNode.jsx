import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  styled,
  Typography,
  TextField,
  Button,
  useTheme,
  MenuItem,
  Grid,
} from '@mui/material';
import CustomizedDialogs from '../components/Modal/Modal';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

const ConditionBox = styled(Box)(() => ({
  display: 'block',
}));

const ConditionalNodeWrap = styled(Box)(() => ({
  width: '80px',
  height: '80px',
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

const schema = yup.object().shape({
  field: yup.string().required('Field is required'),
  operator: yup.string().required('Operator is required'),
  value: yup.string().required('Value is required'),
});

function ConditionalNode({ data, isConnectable, id }) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);
  console.log('data', data, id);
  const theme = useTheme();
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
    data.onSubmit(formData, id);
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
        style={{ zIndex: 6 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ConditionBox>
          <ConditionalNodeWrap>
            <ConditionalHeader>
              <Button
                variant='text'
                sx={{
                  color: theme.palette.grey['900'],
                  fontSize: '11px',
                  textTransform: 'capitalize',
                }}
                size='small'
                onClick={() => setOpen(true)}
              >
                Condition
              </Button>
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
      <CustomizedDialogs
        open={open}
        modalTitle='Add Condition'
        handleClose={handleClose}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ mb: 1 }}>Enter field:</Typography>
              <Controller
                name='field'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    variant='outlined'
                    fullWidth
                    size='small'
                    error={Boolean(errors.field)}
                    helperText={errors.field ? errors.field.message : ''}
                    sx={{ marginBottom: 2, minWidth: 200 }}
                  >
                    <MenuItem value='field1'>Field 1</MenuItem>
                    <MenuItem value='field2'>Field 2</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ mb: 1 }}>Enter Operator:</Typography>
              <Controller
                name='operator'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    variant='outlined'
                    fullWidth
                    size='small'
                    error={Boolean(errors.operator)}
                    helperText={errors.operator ? errors.operator.message : ''}
                    sx={{ marginBottom: 2, minWidth: 200 }}
                  >
                    <MenuItem value='equals'>Equals</MenuItem>
                    <MenuItem value='notEquals'>Not Equals</MenuItem>
                    {/* Add more operators as needed */}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ mb: 1 }}>Enter Value:</Typography>
              <Controller
                name='value'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    fullWidth
                    size='small'
                    error={Boolean(errors.value)}
                    helperText={errors.value ? errors.value.message : ''}
                    sx={{ marginBottom: 2, minWidth: 200 }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box display='flex' justifyContent='flex-end' gap={1}>
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

export default memo(ConditionalNode);

ConditionalNode.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
