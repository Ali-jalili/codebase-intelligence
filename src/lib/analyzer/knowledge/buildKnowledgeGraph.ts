/** @format */

import type { ImportRelationship } from "../static-analysis/types";
import type { KnowledgeGraph, KnowledgeNode } from "./types";

export function buildKnowledgeGraph(
  files: string[],
  relationships: ImportRelationship[],
): KnowledgeGraph {
  const nodes = new Map<string, KnowledgeNode>();

  for (const file of files) {
    nodes.set(file, {
      id: file,
      type: "file",
      path: file,
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
