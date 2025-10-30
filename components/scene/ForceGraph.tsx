import React, { useEffect, useRef, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import ForceGraph3D from 'three-forcegraph';
import * as THREE from 'three';
import type { GraphData, NodeObject, LinkObject, ForceGraphInstance } from '../../types';

interface ForceGraphProps {
  graphData: GraphData;
  onNodeClick: (node: NodeObject | null) => void;
  onNodeHover: (node: NodeObject | null) => void;
  selectedNode: NodeObject | null;
  hoveredNode: NodeObject | null;
  searchTerm: string;
  isConnecting: boolean;
  connectionSourceNode: NodeObject | null;
}

// Define materials for different node types
const materials: { [key: string]: THREE.MeshPhongMaterial } = {
  // Software
  Module: new THREE.MeshPhongMaterial({ color: '#1E90FF', transparent: true, opacity: 0.9 }), // DodgerBlue
  Class: new THREE.MeshPhongMaterial({ color: '#32CD32', transparent: true, opacity: 0.9 }), // LimeGreen
  Function: new THREE.MeshPhongMaterial({ color: '#FFD700', transparent: true, opacity: 0.9 }), // Gold
  Interface: new THREE.MeshPhongMaterial({ color: '#FF4500', transparent: true, opacity: 0.9 }), // OrangeRed
  Persistence: new THREE.MeshPhongMaterial({ color: '#BA55D3', transparent: true, opacity: 0.9 }), // MediumOrchid
  // HR
  Employer: new THREE.MeshPhongMaterial({ color: '#4682B4', transparent: true, opacity: 0.9 }), // SteelBlue
  Department: new THREE.MeshPhongMaterial({ color: '#3CB371', transparent: true, opacity: 0.9 }), // MediumSeaGreen
  Project: new THREE.MeshPhongMaterial({ color: '#FFA07A', transparent: true, opacity: 0.9 }), // LightSalmon
  // PLM
  Product: new THREE.MeshPhongMaterial({ color: '#DC143C', transparent: true, opacity: 0.9 }), // Crimson
  Requirement: new THREE.MeshPhongMaterial({ color: '#00CED1', transparent: true, opacity: 0.9 }), // DarkTurquoise
  // 3D Assets
  '3DModel': new THREE.MeshPhongMaterial({ color: '#FF69B4', transparent: true, opacity: 0.9 }), // HotPink
  Skeleton: new THREE.MeshPhongMaterial({ color: '#F5F5DC', transparent: true, opacity: 0.9 }), // Beige
  Animation: new THREE.MeshPhongMaterial({ color: '#8A2BE2', transparent: true, opacity: 0.9 }), // BlueViolet
  // Humanoid Skeleton
  HAnimJoint: new THREE.MeshPhongMaterial({ color: '#E0E0E0', transparent: true, opacity: 0.9 }), // Light Gray
  HAnimSegment: new THREE.MeshPhongMaterial({ color: '#CD853F', transparent: true, opacity: 0.9 }), // Peru
  HAnimSite: new THREE.MeshPhongMaterial({ color: '#00FFFF', transparent: true, opacity: 0.9 }), // Aqua
  // Knowledge
  CentralConcept: new THREE.MeshPhongMaterial({ color: '#FFFF00', transparent: true, opacity: 0.9 }), // Yellow
  MainTopic: new THREE.MeshPhongMaterial({ color: '#ADFF2F', transparent: true, opacity: 0.9 }), // GreenYellow
  // Database
  EntityType: new THREE.MeshPhongMaterial({ color: '#20B2AA', transparent: true, opacity: 0.9 }), // LightSeaGreen
  Relationship: new THREE.MeshPhongMaterial({ color: '#778899', transparent: true, opacity: 0.9 }), // LightSlateGray
  // E-Commerce
  SessionObject: new THREE.MeshPhongMaterial({ color: '#6A5ACD', transparent: true, opacity: 0.9 }), // SlateBlue
  // Hardware
  Chip: new THREE.MeshPhongMaterial({ color: '#A9A9A9', transparent: true, opacity: 0.9 }), // DarkGray
  Architecture: new THREE.MeshPhongMaterial({ color: '#B22222', transparent: true, opacity: 0.9 }), // Firebrick
  // Grammar
  Rule: new THREE.MeshPhongMaterial({ color: '#DEB887', transparent: true, opacity: 0.9 }), // BurlyWood
  Symbol: new THREE.MeshPhongMaterial({ color: '#D2B48C', transparent: true, opacity: 0.9 }), // Tan
  // OS
  Manager: new THREE.MeshPhongMaterial({ color: '#008B8B', transparent: true, opacity: 0.9 }), // DarkCyan
  ObjectModel: new THREE.MeshPhongMaterial({ color: '#BC8F8F', transparent: true, opacity: 0.9 }), // RosyBrown
  // Real Estate
  Property: new THREE.MeshPhongMaterial({ color: '#D2691E', transparent: true, opacity: 0.9 }), // Chocolate
  Leaseable: new THREE.MeshPhongMaterial({ color: '#A0522D', transparent: true, opacity: 0.9 }), // Sienna
  // Accessible IDE
  Core: new THREE.MeshPhongMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.9 }), // White
  Input: new THREE.MeshPhongMaterial({ color: '#00FF7F', transparent: true, opacity: 0.9 }), // SpringGreen
  Output: new THREE.MeshPhongMaterial({ color: '#1E90FF', transparent: true, opacity: 0.9 }), // DodgerBlue
  // Forms
  Form: new THREE.MeshPhongMaterial({ color: '#F0E68C', transparent: true, opacity: 0.9 }), // Khaki
  Cell: new THREE.MeshPhongMaterial({ color: '#E6E6FA', transparent: true, opacity: 0.9 }), // Lavender
  SharedCell: new THREE.MeshPhongMaterial({ color: '#FFB6C1', transparent: true, opacity: 0.9 }), // LightPink
  // Default
  Default: new THREE.MeshPhongMaterial({ color: '#9932CC', transparent: true, opacity: 0.9 }), // DarkOrchid
};

const getMaterial = (type: string) => materials[type] || materials.Default;

export const ForceGraph: React.FC<ForceGraphProps> = ({ graphData, onNodeClick, onNodeHover, selectedNode, hoveredNode, searchTerm, isConnecting, connectionSourceNode }) => {
  const { scene, gl, camera } = useThree();
  const graphRef = useRef<ForceGraphInstance | null>(null);

  const memoizedNodeThreeObject = useCallback((node: NodeObject) => {
    const material = getMaterial(node.type);
    const size = Math.max(1, Math.log(node.val + 1) * 1.5);
    const geometry = new THREE.SphereGeometry(size, 16, 8);
    const mesh = new THREE.Mesh(geometry, material.clone());
    
    (mesh as any).__data = node;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        const fontSize = 24;
        context.font = `Bold ${fontSize}px Arial`;
        const textWidth = context.measureText(node.name).width;
        canvas.width = textWidth + 20;
        canvas.height = fontSize + 16;

        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.font = `Bold ${fontSize}px Arial`;
        context.fillStyle = 'rgba(255, 255, 255, 0.95)';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(node.name, canvas.width / 2, canvas.height / 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(canvas.width / 8, canvas.height / 8, 1.0);
    sprite.position.set(0, size + 5, 0);
    sprite.visible = false;
    mesh.add(sprite);
    
    (mesh as any).__labelSprite = sprite;
    
    return mesh;
  }, []);

  useEffect(() => {
    const graph = new ForceGraph3D();
    graphRef.current = graph;
    
    graph.graphData({ nodes: [], links: [] });
    graph.linkWidth(0.5);
    graph.linkDirectionalParticles(2);
    graph.linkDirectionalParticleWidth(0.8);
    graph.linkDirectionalParticleSpeed(0.006);
    graph.nodeThreeObject(memoizedNodeThreeObject);
      
    scene.add(graph);

    return () => {
        if(graphRef.current) {
            scene.remove(graphRef.current);
            graphRef.current.graphData({nodes:[], links:[]});
        }
    };
  }, [scene, memoizedNodeThreeObject]);
  
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleInteraction = (event: PointerEvent, callback: (node: NodeObject | null) => void) => {
        if (!graphRef.current) return;

        const canvas = gl.domElement;
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const nodes = graphRef.current.graphData().nodes;
        const nodeObjects = nodes.map((node: any) => node.__threeObj).filter(Boolean);
        
        const intersects = raycaster.intersectObjects(nodeObjects);

        if (intersects.length > 0) {
            const intersectedNode = (intersects[0].object as any).__data as NodeObject;
            callback(intersectedNode);
        } else {
            callback(null);
        }
    };

    const handlePointerDown = (event: PointerEvent) => handleInteraction(event, onNodeClick);
    const handlePointerMove = (event: PointerEvent) => handleInteraction(event, onNodeHover);

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);

    return () => {
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointermove', handlePointerMove);
    };
  }, [gl, camera, onNodeClick, onNodeHover]);


  useEffect(() => {
    if (graphRef.current) {
        graphRef.current.graphData(graphData);
    }
  }, [graphData]);

  useEffect(() => {
    if (!graphRef.current) return;

    const hasSelection = selectedNode !== null;
    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    const adjacentNodeIds = new Set<string>();
    if (selectedNode) {
        adjacentNodeIds.add(selectedNode.id);
        graphRef.current.graphData().links.forEach((link: LinkObject) => {
            const sourceId = typeof link.source === 'object' ? (link.source as NodeObject).id : String(link.source);
            const targetId = typeof link.target === 'object' ? (link.target as NodeObject).id : String(link.target);
            if (sourceId === selectedNode.id) adjacentNodeIds.add(targetId);
            if (targetId === selectedNode.id) adjacentNodeIds.add(sourceId);
        });
    }

    graphRef.current.graphData().nodes.forEach((node: NodeObject) => {
        const threeObj = (node as any).__threeObj as THREE.Mesh;
        if (threeObj) {
            const material = threeObj.material as THREE.MeshPhongMaterial;
            const labelSprite = (threeObj as any).__labelSprite as THREE.Sprite;

            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode?.id === node.id;
            const isAdjacent = adjacentNodeIds.has(node.id);
            const isMatch = !lowerSearchTerm || node.name.toLowerCase().includes(lowerSearchTerm) || node.description.toLowerCase().includes(lowerSearchTerm);

            const isConnectionSource = connectionSourceNode?.id === node.id;
            const isConnectionTargetHover = isConnecting && connectionSourceNode && isHovered && hoveredNode?.id !== connectionSourceNode.id;

            material.emissive.setHex(0x000000);
            material.opacity = 0.9;
            
            if (isConnecting) {
                material.opacity = 0.1;
                if (isConnectionSource || isConnectionTargetHover) {
                    material.opacity = 1.0;
                }
            } else {
                 if (hasSelection && !isAdjacent) material.opacity = 0.15;
                 if (lowerSearchTerm && !isMatch) material.opacity = 0.05;
            }

            if (isHovered) material.emissive.setHex(0x666666);
            if (isSelected) material.emissive.setHex(0xcccccc);
            
            if (isConnectionSource) material.emissive.setHex(0x00ff00); // Green for source
            if (isConnectionTargetHover) material.emissive.setHex(0x0000ff); // Blue for target hover

            if (labelSprite) {
                labelSprite.visible = (isSelected || isHovered || isConnectionSource) && isMatch;
            }
        }
    });

    graphRef.current.linkColor((link: LinkObject) => {
        const sourceId = typeof link.source === 'object' ? (link.source as NodeObject).id : String(link.source);
        const targetId = typeof link.target === 'object' ? (link.target as NodeObject).id : String(link.target);

        const isConnectedToSelection = hasSelection && selectedNode && (sourceId === selectedNode.id || targetId === selectedNode.id);
        const isFaded = (isConnecting && !connectionSourceNode) || (hasSelection && !isConnectedToSelection)

        if (isFaded) return 'rgba(255, 255, 255, 0.05)';
        if (isConnectedToSelection) return 'rgba(255, 255, 255, 0.8)';
        
        return 'rgba(255, 255, 255, 0.2)';
    });

  }, [selectedNode, hoveredNode, graphData, searchTerm, isConnecting, connectionSourceNode]);

  useFrame(() => {
    if (graphRef.current) {
      graphRef.current.tickFrame();
    }
  });

  return null;
};