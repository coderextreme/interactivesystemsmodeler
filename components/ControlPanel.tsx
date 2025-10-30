
import React from 'react';
import type { Domain } from '../types';
import { PlusIcon } from './icons/Icons';

interface ControlPanelProps {
  domains: Domain[];
  selectedDomainId: string;
  onSelectDomain: (domain: Domain) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddNodeClick: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ domains, selectedDomainId, onSelectDomain, searchTerm, onSearchChange, onAddNodeClick }) => {
  return (
    <aside className="w-64 p-4 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 z-20 flex flex-col">
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-4 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Domains</h2>
      <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-1">
        {domains.map(domain => {
          const isSelected = domain.id === selectedDomainId;
          return (
            <button
              key={domain.id}
              onClick={() => onSelectDomain(domain)}
              className={`flex items-center space-x-3 p-2 rounded-lg text-left transition-colors duration-200 ${
                isSelected 
                  ? 'bg-cyan-500/20 text-cyan-300' 
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <domain.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{domain.name}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <button
          onClick={onAddNodeClick}
          className="flex items-center justify-center space-x-2 w-full p-2 rounded-lg text-left transition-colors duration-200 bg-cyan-600/80 text-white hover:bg-cyan-500"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="text-sm font-semibold">Add New Node</span>
        </button>
      </div>
    </aside>
  );
};
