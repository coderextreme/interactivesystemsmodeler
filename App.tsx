import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { InfoPanel } from './components/InfoPanel';
import { Timeline } from './components/Timeline';
import { Scene } from './components/scene/Scene';
import { domains as initialDomains } from './data/domainData';
import type { NodeObject, Domain, LinkObject } from './types';

interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (node: Omit<NodeObject, 'id' | 'val'> & { val: string }) => void;
}

const AddNodeModal: React.FC<AddNodeModalProps> = ({ isOpen, onClose, onAddNode }) => {
  const [newNode, setNewNode] = useState({
    name: '',
    type: 'Default',
    description: '',
    val: '5',
    startTime: 0,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNode(prev => ({ ...prev, [name]: name === 'startTime' || name === 'val' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNode.name || !newNode.type) {
      alert('Name and Type are required.');
      return;
    }
    onAddNode({ ...newNode, val: String(newNode.val) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-lg font-bold mb-4">Add New Node</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input type="text" name="name" value={newNode.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Type</label>
            <input type="text" name="type" value={newNode.type} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea name="description" value={newNode.description} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"></textarea>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300">Size Value</label>
              <input type="number" name="val" value={newNode.val} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300">Start Time</label>
              <input type="number" name="startTime" value={newNode.startTime} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 transition-colors">Add Node</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [domainsData, setDomainsData] = useState<Domain[]>(initialDomains);
  const [selectedDomainId, setSelectedDomainId] = useState<string>(initialDomains[0].id);
  const [selectedNode, setSelectedNode] = useState<NodeObject | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(100);
  const [hoveredNode, setHoveredNode] = useState<NodeObject | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSourceNode, setConnectionSourceNode] = useState<NodeObject | null>(null);

  const selectedDomain = useMemo(() => domainsData.find(d => d.id === selectedDomainId)!, [domainsData, selectedDomainId]);
  
  const handleToggleConnectMode = useCallback(() => {
    setIsConnecting(prev => {
      const nextState = !prev;
      if (nextState && selectedNode) {
        setConnectionSourceNode(selectedNode);
      } else {
        setConnectionSourceNode(null);
      }
      return nextState;
    });
  }, [selectedNode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsConnecting(false);
        setConnectionSourceNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!selectedDomain) {
      setSelectedDomainId(domainsData[0]?.id || '');
    }
  }, [domainsData, selectedDomain]);

  const handleSelectDomain = useCallback((domain: Domain) => {
    setSelectedDomainId(domain.id);
    setSelectedNode(null);
    setHoveredNode(null);
    setIsConnecting(false);
    setConnectionSourceNode(null);
  }, []);

  const handleTimeChange = useCallback((newTime: number) => {
    setCurrentTime(newTime);
    setSelectedNode(null);
    setHoveredNode(null);
  }, []);

  const handleAddLink = useCallback((targetNode: NodeObject) => {
    if (!connectionSourceNode || connectionSourceNode.id === targetNode.id) return;

    const newLink = { source: connectionSourceNode.id, target: targetNode.id };

    setDomainsData(prevData => prevData.map(domain => {
      if (domain.id === selectedDomainId) {
        // Avoid adding duplicate links
        const linkExists = domain.data.links.some(l => 
            (l.source === newLink.source && l.target === newLink.target) ||
            (l.source === newLink.target && l.target === newLink.source)
        );
        if (linkExists) return domain;

        return {
          ...domain,
          data: {
            ...domain.data,
            links: [...domain.data.links, newLink],
          },
        };
      }
      return domain;
    }));
    
    setIsConnecting(false);
    setConnectionSourceNode(null);
  }, [selectedDomainId, connectionSourceNode]);

  const handleNodeClick = useCallback((node: NodeObject | null) => {
    if (isConnecting && node) {
      if (connectionSourceNode) {
        handleAddLink(node);
      }
    } else {
      setSelectedNode(node);
    }
  }, [isConnecting, connectionSourceNode, handleAddLink]);

  const handleNodeHover = useCallback((node: NodeObject | null) => {
    setHoveredNode(node);
  }, []);

  const handleUpdateNode = useCallback((updatedNode: NodeObject) => {
    setDomainsData(prevData => prevData.map(domain => {
      if (domain.id === selectedDomainId) {
        return {
          ...domain,
          data: {
            ...domain.data,
            nodes: domain.data.nodes.map(node => node.id === updatedNode.id ? updatedNode : node),
          },
        };
      }
      return domain;
    }));
  }, [selectedDomainId]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    if (window.confirm('Are you sure you want to delete this node? This will also remove any connected links.')) {
        setDomainsData(prevData => prevData.map(domain => {
            if (domain.id === selectedDomainId) {
                const newNodes = domain.data.nodes.filter(n => n.id !== nodeId);
                const newNodeIds = new Set(newNodes.map(n => n.id));
                const newLinks = domain.data.links.filter(l => {
                    const sourceId = typeof l.source === 'object' ? (l.source as NodeObject).id : String(l.source);
                    const targetId = typeof l.target === 'object' ? (l.target as NodeObject).id : String(l.target);
                    return newNodeIds.has(sourceId) && newNodeIds.has(targetId);
                });

                return {
                    ...domain,
                    data: { nodes: newNodes, links: newLinks },
                };
            }
            return domain;
        }));
        setSelectedNode(null);
    }
  }, [selectedDomainId]);
  
  const handleAddNode = useCallback((newNodeData: Omit<NodeObject, 'id' | 'val'> & { val: string }) => {
    const newNode: NodeObject = {
      ...newNodeData,
      id: `${newNodeData.name.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
      val: parseInt(newNodeData.val, 10) || 1,
    };

    setDomainsData(prevData => prevData.map(domain => {
      if (domain.id === selectedDomainId) {
        return {
          ...domain,
          data: {
            ...domain.data,
            nodes: [...domain.data.nodes, newNode],
          },
        };
      }
      return domain;
    }));
  }, [selectedDomainId]);

  const handleDeleteLink = useCallback((linkToDelete: LinkObject) => {
    setDomainsData(prevData => prevData.map(domain => {
        if (domain.id === selectedDomainId) {
            const sourceIdToDelete = typeof linkToDelete.source === 'object' ? (linkToDelete.source as NodeObject).id : String(linkToDelete.source);
            const targetIdToDelete = typeof linkToDelete.target === 'object' ? (linkToDelete.target as NodeObject).id : String(linkToDelete.target);

            const newLinks = domain.data.links.filter(l => {
                const sourceId = typeof l.source === 'object' ? (l.source as NodeObject).id : String(l.source);
                const targetId = typeof l.target === 'object' ? (l.target as NodeObject).id : String(l.target);
                // Check both directions
                return !(
                    (sourceId === sourceIdToDelete && targetId === targetIdToDelete) ||
                    (sourceId === targetIdToDelete && targetId === sourceIdToDelete)
                );
            });
            return {
                ...domain,
                data: { ...domain.data, links: newLinks },
            };
        }
        return domain;
    }));
}, [selectedDomainId]);


  const filteredData = useMemo(() => {
    if (!selectedDomain) return { nodes: [], links: [] };
    
    const { nodes, links } = selectedDomain.data;
    const visibleNodes = nodes.filter(node => node.startTime <= currentTime);
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    
    const visibleLinks = links.filter(link => {
        const sourceId = typeof link.source === 'object' ? (link.source as NodeObject).id : String(link.source);
        const targetId = typeof link.target === 'object' ? (link.target as NodeObject).id : String(link.target);
        return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    return { nodes: visibleNodes, links: visibleLinks };
  }, [selectedDomain, currentTime]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans bg-gray-900">
      <Header />
      <div className="flex flex-1 relative overflow-hidden">
        <ControlPanel
          domains={domainsData}
          selectedDomainId={selectedDomainId}
          onSelectDomain={handleSelectDomain}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNodeClick={() => setAddModalOpen(true)}
        />
        <main className="flex-1 relative bg-gray-800/30">
          <Scene 
            graphData={filteredData} 
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            selectedNode={selectedNode}
            hoveredNode={hoveredNode}
            searchTerm={searchTerm}
            isConnecting={isConnecting}
            connectionSourceNode={connectionSourceNode}
          />
        </main>
        <InfoPanel 
          node={selectedNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onToggleConnectMode={handleToggleConnectMode}
          isConnecting={isConnecting}
          graphData={filteredData}
          onDeleteLink={handleDeleteLink}
        />
      </div>
      <Timeline 
        currentTime={currentTime}
        onTimeChange={handleTimeChange}
      />
      <AddNodeModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddNode={handleAddNode}
      />
    </div>
  );
};

export default App;