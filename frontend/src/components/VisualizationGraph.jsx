import React, { useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'react-flow-renderer';

const nodeTypes = {
  input: ({ data }) => {
    const backgroundColor = data.isCurrent
      ? 'yellow'
      : data.visited
      ? 'lightgreen'
      : 'lightblue';

    return (
      <div style={{ padding: '5px', backgroundColor, borderRadius: '4px' }}>
        {data.label}
      </div>
    );
  },
};

const assignPositions = (nodes) => {
  return nodes.map((node, index) => ({
    ...node,
    position: node.position || { x: (index % 5) * 150, y: Math.floor(index / 5) * 100 },
    data: {
      ...node.data,
      label: node.id,
      visited: false,
      isCurrent: false,
    },
  }));
};

const runDijkstra = async (nodes, edges, startNode, searchSpeed, setNodes, setEdges) => {
    const nodeDistances = {};
    const visitedNodes = new Set();
    const unvisitedNodes = [...nodes];
  
    // Initialize distances
    nodes.forEach((node) => {
      nodeDistances[node.id] = node.id === startNode ? 0 : Infinity;
    });
  
    while (unvisitedNodes.length) {
      // Sort by current shortest distance
      unvisitedNodes.sort((a, b) => nodeDistances[a.id] - nodeDistances[b.id]);
      const currentNode = unvisitedNodes.shift();
      if (!currentNode) break;
  
      visitedNodes.add(currentNode.id);
  
      // Highlight current node
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label: `${node.id} (${nodeDistances[node.id]})`,
          },
          style: {
            ...node.style,
            backgroundColor:
              node.id === currentNode.id ? '#ffa' : visitedNodes.has(node.id) ? '#d4edda' : 'lightblue',
            border: node.id === currentNode.id ? '2px solid orange' : undefined,
          },
        }))
      );
  
      await new Promise((resolve) => setTimeout(resolve, searchSpeed));
  
      // Explore neighbors
      for (const edge of edges) {
        if (edge.source === currentNode.id && !visitedNodes.has(edge.target)) {
          const newDist = nodeDistances[currentNode.id] + parseInt(edge.label);
          if (newDist < nodeDistances[edge.target]) {
            nodeDistances[edge.target] = newDist;
          }
  
          // Highlight edge
          setEdges((prev) =>
            prev.map((e) =>
              e.id === edge.id
                ? {
                    ...e,
                    style: {
                      stroke: 'orange',
                      strokeWidth: 2,
                    },
                  }
                : e
            )
          );
  
          await new Promise((resolve) => setTimeout(resolve, searchSpeed));
        }
      }
    }
  };
  
export default function VisualizationGraph({ nodes, edges, searchSpeed, startNode }) {
  const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState(assignPositions(nodes));
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState(edges);

  // On graph generation
  useEffect(() => {
    setReactFlowNodes(assignPositions(nodes));
    setReactFlowEdges(edges);
  }, [nodes, edges]);

  useEffect(() => {
    if (startNode) {
      // Reset nodes and edges before running Dijkstra
      const resetNodes = reactFlowNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          visited: false,
          isCurrent: false,
          label: node.id,  // Reset label
        },
      }));
  
      const resetEdges = reactFlowEdges.map((edge) => ({
        ...edge,
        style: {},  // Reset edge style
      }));
  
      setReactFlowNodes(resetNodes);
      setReactFlowEdges(resetEdges);
  
      runDijkstra(resetNodes, resetEdges, startNode, searchSpeed, setReactFlowNodes, setReactFlowEdges);
    }
  }, [startNode, searchSpeed]);
  

  return (
    <div style={{ height: '500px' }}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
}
