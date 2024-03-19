import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import './App.css';
import './index.css';
import EmailNode from './custom-nodes/EmailNode';
import ConditionalNode from './custom-nodes/ConditionalNode';
import SMSNode from './custom-nodes/SMSNode';
import { configuration } from './config/config';

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'input',
  //   data: { label: 'input node' },
  //   position: { x: 250, y: 5 },
  // },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  email: EmailNode,
  conditional: ConditionalNode,
  sms: SMSNode,
};

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        const newParams = {
          ...params,
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
        return addEdge(newParams, eds);
      }),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onSubmit = (data, id) => {
    console.log('parent', data);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== id) {
          return node;
        }
        const formData = data;
        return {
          ...node,
          data: {
            ...node.data,
            formData,
          },
        };
      })
    );
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log('react flow instance', reactFlowInstance, type);
      let dynamicClassName;
      if (type === 'input') {
        dynamicClassName = 'dndnode input';
      } else if (type === 'default') {
        dynamicClassName = 'dndnode default';
      } else if (type === 'output') {
        dynamicClassName = 'dndnode output';
      } else if (type === 'email') {
        dynamicClassName = 'text-updater-node';
      } else if (type === 'conditional') {
        dynamicClassName = 'conditional-container';
      } else if (type === 'sms') {
        dynamicClassName = 'sms-node';
      } else return;

      console.log('config', configuration);

      const mappedMetaDataObj = configuration.filter(
        (item) => item.type === type
      )[0];
      console.log('metadata', mappedMetaDataObj);

      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: mappedMetaDataObj.label,
          configData: mappedMetaDataObj,
          onSubmit: onSubmit,
        },
        className: dynamicClassName,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  console.log('node', nodes, edges);

  return (
    <div className='dndflow'>
      {console.log('rerender', nodes)}
      <ReactFlowProvider>
        <div
          className='reactflow-wrapper'
          style={{ height: '500px', width: '500px' }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap zoomable pannable />
            <Background color='#aaa' variant='dots' gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
