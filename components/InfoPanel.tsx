import React, { useState, useEffect, useMemo } from 'react';
import type { NodeObject, LinkObject, GraphData } from '../types';
import { TagIcon, CheckIcon, TrashIcon, LinkIcon } from './icons/Icons';

interface InfoPanelProps {
  node: NodeObject | null;
  graphData: GraphData;
  onUpdateNode: (node: NodeObject) => void;
  onDeleteNode: (nodeId: string) => void;
  onDeleteLink: (link: LinkObject) => void;
  onToggleConnectMode: () => void;
  isConnecting: boolean;
}

const InfoInput: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; readOnly?: boolean }> = 
({ label, name, value, onChange, type = 'text', readOnly = false }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full bg-gray-700/80 border border-gray-600 rounded-md shadow-sm py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 ${readOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
    />
  </div>
);

const InfoTextarea: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; }> =
({ label, name, value, onChange }) => (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full bg-gray-700/80 border border-gray-600 rounded-md shadow-sm py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
      />
    </div>
  );


export const InfoPanel: React.FC<InfoPanelProps> = ({ node, graphData, onUpdateNode, onDeleteNode, onDeleteLink, onToggleConnectMode, isConnecting }) => {
  const [editNode, setEditNode] = useState<NodeObject | null>(null);

  useEffect(() => {
    setEditNode(node);
  }, [node]);

  const connections = useMemo(() => {
    if (!node) return [];
    const connectedLinks = graphData.links.filter(link => {
        const sourceId = typeof link.source === 'object' ? (link.source as NodeObject).id : String(link.source);
        const targetId = typeof link.target === 'object' ? (link.target as NodeObject).id : String(link.target);
        return sourceId === node.id || targetId === node.id;
    });

    return connectedLinks.map(link => {
        const sourceId = typeof link.source === 'object' ? (link.source as NodeObject).id : String(link.source);
        const targetId = typeof link.target === 'object' ? (link.target as NodeObject).id : String(link.target);
        const otherNodeId = sourceId === node.id ? targetId : sourceId;
        const otherNode = graphData.nodes.find(n => n.id === otherNodeId);
        return { link, otherNode };
    }).filter(conn => conn.otherNode); // Filter out connections to nodes that might not be visible
  }, [node, graphData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editNode) return;
    const { name, value } = e.target;
    setEditNode({
      ...editNode,
      [name]: (name === 'val' || name === 'startTime') ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSave = () => {
    if (editNode) {
      onUpdateNode(editNode);
    }
  };

  const handleDelete = () => {
    if (editNode) {
      onDeleteNode(editNode.id);
    }
  };

  return (
    <aside 
      className={`w-72 bg-gray-900/50 backdrop-blur-sm border-l border-gray-700/50 z-20 transition-transform duration-300 ease-in-out flex flex-col ${
        node ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {editNode ? (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Node Details</h2>
            <div className="space-y-3">
                <InfoInput label="Name" name="name" value={editNode.name} onChange={handleChange} />
                <InfoInput label="ID" name="id" value={editNode.id} onChange={() => {}} readOnly />
                <InfoInput label="Type" name="type" value={editNode.type} onChange={handleChange} />
                <InfoTextarea label="Description" name="description" value={editNode.description} onChange={handleChange} />
                <InfoInput label="Size Value" name="val" type="number" value={editNode.val} onChange={handleChange} />
                <InfoInput label="Start Time" name="startTime" type="number" value={editNode.startTime} onChange={handleChange} />
            </div>
            
            <div className="flex space-x-2 pt-4">
                <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-200 bg-green-600/80 text-white hover:bg-green-500"
                >
                    <CheckIcon className="w-5 h-5"/>
                    <span>Save</span>
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-200 bg-red-600/80 text-white hover:bg-red-500"
                >
                    <TrashIcon className="w-5 h-5"/>
                    <span>Delete</span>
                </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Actions</h3>
                <button
                    onClick={onToggleConnectMode}
                    className={`w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-200 text-white ${
                        isConnecting ? 'bg-yellow-600/80 hover:bg-yellow-500' : 'bg-blue-600/80 hover:bg-blue-500'
                    }`}
                >
                    <LinkIcon className="w-5 h-5" />
                    <span>{isConnecting ? 'Cancel Connection' : 'Connect Node'}</span>
                </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700/50 flex-1">
                 <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Connections ({connections.length})</h3>
                 <div className="space-y-2 pr-1">
                    {connections.length > 0 ? (
                        connections.map(({ link, otherNode }) => otherNode && (
                            <div key={`${otherNode.id}-${node?.id}`} className="flex items-center justify-between bg-gray-800/50 p-2 rounded-md">
                                <span className="text-sm text-gray-300 truncate" title={otherNode.name}>{otherNode.name}</span>
                                <button onClick={() => onDeleteLink(link)} className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-500 italic">No connections.</p>
                    )}
                 </div>
            </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
            <TagIcon className="w-12 h-12 mb-4"/>
            <p className="text-sm">Click on a node in the graph to see its details.</p>
        </div>
      )}
    </aside>
  );
};