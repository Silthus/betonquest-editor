import React, { useMemo } from 'react';
import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MiniMap,
  Controls,
} from 'react-flow-renderer';
import { TextUpdaterNode } from '../nodes/Conversation';

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Bob (NPC)' },
    position: { x: 5, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Sawmill (Quest)' },
    position: { x: 5, y: 100 },
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '2a',
    data: { label: 'Initial Conversation' },
    position: { x: 15, y: 65 },
    className: 'light',
    parentNode: '2',
    extent: 'parent',
    type: 'conversation',
  },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export function Flow() {
  const nodeTypes = useMemo(() => ({ conversation: TextUpdaterNode }), []);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges(eds => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
