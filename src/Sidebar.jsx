import { Box, styled, Typography, useTheme } from '@mui/material';

const StartBoxStyle = styled(Box)(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#007F73',
  marginBottom: '20px',
  color: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
  cursor: 'grab',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.2)',
    color: '#fff',
  },
}));

const EmailBoxStyle = styled(Box)(() => ({
  padding: '10px 20px',
  width: '10vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#008dda',
  color: '#fff',
  backgroundColor: '#0C2D57',
  marginBottom: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
  cursor: 'grab',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.6)',
    color: '#fff',
  },
}));

const ConditionBox = styled(Box)(() => ({
  display: 'block',
  marginTop: '20px',
  marginBottom: '30px',
}));

const ConditionalNodeWrap = styled(Box)(() => ({
  width: '70px',
  height: '70px',
  transform: 'rotate(45deg)',
  background: '#ffd700',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
  cursor: 'grab',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.1)',
    color: '#fff',
  },
}));

const ConditionalHeader = styled(Box)(() => ({
  transform: 'rotate(-45deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));

const SMSBoxStyle = styled(Box)(() => ({
  padding: '10px 20px',
  width: '10vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  backgroundColor: '#6F509E',
  marginBottom: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
  cursor: 'grab',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.2)',
    color: '#fff',
  },
}));

const OutputBoxStyle = styled(Box)(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FF204E',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.49)',
  marginBottom: '10px',
  color: '#fff',
  cursor: 'grab',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.5)',
  },
}));

const Sidebar = () => {
  const theme = useTheme();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className='description'>
        <Typography variant='h6' mb={5} mt={3} color={theme.palette.grey[500]}>
          Drag these nodes to the pane on the right
        </Typography>
      </div>
      <StartBoxStyle
        draggable
        onDragStart={(event) => onDragStart(event, 'start')}
      >
        Start
      </StartBoxStyle>
      <EmailBoxStyle
        draggable
        onDragStart={(event) => onDragStart(event, 'email')}
      >
        Email
      </EmailBoxStyle>
      <ConditionBox
        draggable
        onDragStart={(event) => onDragStart(event, 'conditional')}
      >
        <ConditionalNodeWrap>
          <ConditionalHeader>
            <Typography
              sx={{
                color: theme.palette.grey['900'],
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              Condition
            </Typography>
          </ConditionalHeader>
        </ConditionalNodeWrap>
      </ConditionBox>
      <SMSBoxStyle draggable onDragStart={(event) => onDragStart(event, 'sms')}>
        SMS
      </SMSBoxStyle>
      <OutputBoxStyle
        draggable
        onDragStart={(event) => onDragStart(event, 'stop')}
      >
        Stop
      </OutputBoxStyle>
    </aside>
  );
};

export default Sidebar;
