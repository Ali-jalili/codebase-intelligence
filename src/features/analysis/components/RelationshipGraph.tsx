/** @format */

"use client";

/** @format */

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type { KnowledgeGraph } from "@/lib/analyzer/knowledge/types";

type RelationshipGraphProps = {
  graph: KnowledgeGraph;
};

export default function RelationshipGraph({ graph }: RelationshipGraphProps) {
  const nodes: Node[] = graph.nodes.map((node) => ({
    id: node.id,
    position: {
      // eslint-disable-next-line react-hooks/purity
      x: Math.random() * 800,
      // eslint-disable-next-line react-hooks/purity
      y: Math.random() * 500,
    },
    data: {
      label: node.path,
    },
  }));

  const edges: Edge[] = graph.relationships.map((relationship, index) => ({
    id: `${relationship.source}-${relationship.target}-${index}`,
    source: relationship.source,
    target: relationship.target,
    label: relationship.type,
  }));

  return (
    <div className="h-[600px] w-full rounded-lg border">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
