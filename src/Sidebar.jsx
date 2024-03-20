const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className='description'>
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className='dndnode input'
        draggable
        onDragStart={(event) => onDragStart(event, 'start')}
      >
        Start
      </div>
      {/* <div
        className='dndnode default'
        draggable
        onDragStart={(event) => onDragStart(event, 'default')}
      >
        Default Node
      </div> */}
      <div
        className='dndnode email'
        draggable
        onDragStart={(event) => onDragStart(event, 'email')}
      >
        Email
      </div>
      <div
        className='condition'
        draggable
        onDragStart={(event) => onDragStart(event, 'conditional')}
      >
        <div className='conditional-node'>
          <p className='label'>If</p>
        </div>
      </div>
      <div
        className='dndnode sms'
        draggable
        onDragStart={(event) => onDragStart(event, 'sms')}
      >
        SMS
      </div>
      <div
        className='dndnode output'
        draggable
        onDragStart={(event) => onDragStart(event, 'stop')}
      >
        Stop
      </div>
    </aside>
  );
};

export default Sidebar;
