import React, { useState } from 'react';

export default function UserInputGraph({ nodes, setNodes, edges, setEdges, generateNewGraph, startNode, setStartNode, searchSpeed, setSearchSpeed }) {
  const [nodeName, setNodeName] = useState('');
  const [nodeConnections, setNodeConnections] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddNode = () => {
    if (nodeName && !nodes.some((node) => node.id === nodeName)) {
      const newNode = { id: nodeName, label: nodeName, type: 'default', data: { label: nodeName } };
      setNodes([...nodes, newNode]);
      setNodeName('');
    }
  };

  const handleAddEdge = () => {
    if (nodeConnections.includes('-') && weight) {
      const [fromNode, toNode] = nodeConnections.split('-');
      const newEdge = {
        id: `${fromNode}-${toNode}`,
        source: fromNode,
        target: toNode,
        animated: true,
        label: weight,
        style: { stroke: 'black', strokeWidth: 2 },
      };
      setEdges([...edges, newEdge]);
      setNodeConnections('');
      setWeight('');
    }
  };

  // const handleSubmit = () => {
  //   if (startNode && nodes.length > 0 && edges.length > 0) {
  //     generateNewGraph(nodes, edges);
  //     setStartNode(startNode);
  //     setSearchSpeed(searchSpeed);
  //   }
  // };

  const labelStyle = { fontWeight: 'bold', marginRight: '10px' };
  const inputStyle = { padding: '3px 10px', margin: '5px 0', borderRadius: '6px', border: '1px solid #ccc', width: '200px' };
  const buttonStyle = { padding: '6px 12px', marginLeft: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };
  const sectionStyle = { marginBottom: '20px' };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Graph Builder</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Node Name:</label>
        <input type="text" value={nodeName} onChange={(e) => setNodeName(e.target.value)} style={inputStyle} />
        <button onClick={handleAddNode} style={buttonStyle}>Add Node</button>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Connection (A-B):</label>
        <input type="text" value={nodeConnections} onChange={(e) => setNodeConnections(e.target.value)} style={inputStyle} />
        <label style={labelStyle}>Weight:</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={inputStyle} />
        <button onClick={handleAddEdge} style={buttonStyle}>Add Edge</button>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Start Node:</label>
        <input type="text" value={startNode} onChange={(e) => setStartNode(e.target.value)} placeholder="Start Node" style={inputStyle} />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Search Speed (ms):</label>
        <input type="number" value={searchSpeed} onChange={(e) => setSearchSpeed(Number(e.target.value))} min="10" max="10000" style={inputStyle} />
      </div>

      {/* <div style={{ textAlign: 'center' }}>
        <button onClick={handleSubmit} style={{ ...buttonStyle, background: '#28a745' }}>Generate Graph</button>
      </div> */}
    </div>
  );
}
