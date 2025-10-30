import type { ComponentType } from 'react';
// The ForceGraph3D library is used as a class.
import ForceGraph3D from 'three-forcegraph';

// Extending the base NodeObject from the library
export interface NodeObject {
  id: string;
  name: string;
  type: string;
  description: string;
  val: number; // Represents node size
  startTime: number;
  // Optional properties from three-forcegraph that might be added at runtime
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
  index?: number;
}

export interface LinkObject {
  source: string | NodeObject;
  target: string | NodeObject;
}

export interface GraphData {
  nodes: NodeObject[];
  links: LinkObject[];
}

export interface Domain {
    id: string;
    name: string;
    icon: ComponentType<{ className?: string }>;
    data: GraphData;
}

// The instance type is an instance of the ForceGraph3D class.
// Fix: ForceGraph3D is a class, so InstanceType must be used to get the instance type.
export type ForceGraphInstance = InstanceType<typeof ForceGraph3D>;