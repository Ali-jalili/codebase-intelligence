/** @format */

import ELK from "elkjs/lib/elk.bundled.js";

import type { Edge, Node } from "@xyflow/react";

const elk = new ELK();

export async function getLayoutedElements(nodes: Node[], edges: Edge[]) {
  const graph = {
    id: "root",

    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "elk.spacing.nodeNode": "50",
      "elk.layered.spacing.nodeNodeBetweenLayers": "80",
    },

    children: nodes.map((node) => ({
      id: node.id,
      width: 220,
      height: 80,
    })),

    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  const layout = await elk.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const layoutNode = layout.children?.find((child) => child.id === node.id);

    return {
      ...node,
      position: {
        x: layoutNode?.x ?? 0,
        y: layoutNode?.y ?? 0,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
}
