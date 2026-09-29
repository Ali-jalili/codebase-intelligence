/** @format */

"use client";

/** @format */

import { useEffect, useState } from "react";
import FileNode from "./FileNode";
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

import { getLayoutedElements } from "./graph-layout";

type RelationshipGraphProps = {
  graph: KnowledgeGraph;
};

const nodeTypes = {
  file: FileNode,
};

export default function RelationshipGraph({ graph }: RelationshipGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const initialNodes: Node[] = graph.nodes.map((node) => ({
      id: node.id,
      position: {
        x: 0,
        y: 0,
      },
      type: "file",
      data: {
        label: node.path,
      },
    }));

    const initialEdges: Edge[] = graph.relationships.map(
      (relationship, index) => ({
        id: `${relationship.source}-${relationship.target}-${index}`,
        source: relationship.source,
        target: relationship.target,
        type: "smoothstep",
      }),
    );

    async function applyLayout() {
      const layouted = await getLayoutedElements(initialNodes, initialEdges);

      setNodes(layouted.nodes);
      setEdges(layouted.edges);
    }

    applyLayout();
  }, [graph]);

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50/40">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background gap={20} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
