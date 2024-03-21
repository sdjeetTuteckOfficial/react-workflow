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
}));

const EmailBoxStyle = styled(Box)(() => ({
  padding: '10px 20px',
  width: '10vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#008dda',
  color: '#fff',
  backgroundColor: '#619293',
  marginBottom: '10px',
}));

const ConditionBox = styled(Box)(() => ({
  display: 'block',
  marginTop: '20px',
  marginBottom: '30px',
}));

const ConditionalNodeWrap = styled(Box)(() => ({
  width: '60px',
  height: '60px',
  transform: 'rotate(45deg)',
  background: '#ffd700',
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
}));

const OutputBoxStyle = styled(Box)(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FF204E',
  marginBottom: '10px',
  color: '#fff',
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
            <h6>Condition</h6>
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
