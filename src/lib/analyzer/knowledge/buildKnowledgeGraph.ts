/** @format */

import type { ImportRelationship } from "../static-analysis/types";

import type { KnowledgeGraph, KnowledgeNode } from "./types";

export function buildKnowledgeGraph(
  files: string[],
  relationships: ImportRelationship[],
): KnowledgeGraph {
  const nodes = new Map<string, KnowledgeNode>();

  for (const relationship of relationships) {
    nodes.set(relationship.source, {
      id: relationship.source,
      type: "file",
      path: relationship.source,
    });

    nodes.set(relationship.target, {
      id: relationship.target,
      type: "file",
      path: relationship.target,
    });
  }

  return {
    nodes: Array.from(nodes.values()),
    relationships: relationships.map((relationship) => ({
      source: relationship.source,
      target: relationship.target,
      type: "imports",
    })),
  };
}
