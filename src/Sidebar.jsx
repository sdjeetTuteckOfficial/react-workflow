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
        onDragStart={(event) => onDragStart(event, 'input')}
      >
        Start
      </div>
      <div
        className='dndnode default'
        draggable
        onDragStart={(event) => onDragStart(event, 'default')}
      >
        Default Node
      </div>
      <div
        className='dndnode default'
        draggable
        onDragStart={(event) => onDragStart(event, 'email')}
      >
        email Node
      </div>
      <div
        className='dndnode default'
        draggable
        onDragStart={(event) => onDragStart(event, 'conditional')}
      >
        Conditional
      </div>
      <div
        className='dndnode output'
        draggable
        onDragStart={(event) => onDragStart(event, 'output')}
      >
        Stop
      </div>
    </aside>
  );
};

export default Sidebar;
