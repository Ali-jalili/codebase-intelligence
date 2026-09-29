/** @format */

export type KnowledgeNode = {
  id: string;
  type: "file";
  path: string;
};

export type KnowledgeRelationship = {
  source: string;
  target: string;
  type: "imports";
};

export type KnowledgeGraph = {
  nodes: KnowledgeNode[];
  relationships: KnowledgeRelationship[];
};
