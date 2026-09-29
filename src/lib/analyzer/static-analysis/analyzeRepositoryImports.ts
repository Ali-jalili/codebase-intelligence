/** @format */

import path from "node:path";

import { analyzeImports } from "./analyzeImports";
import type { ImportRelationship } from "./types";

const ANALYZABLE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

export async function analyzeRepositoryImports(
  files: string[],
  rootPath: string,
): Promise<ImportRelationship[]> {
  const relationships: ImportRelationship[] = [];

  for (const file of files) {
    const extension = path.extname(file);

    if (!ANALYZABLE_EXTENSIONS.includes(extension)) {
      continue;
    }

    const filePath = path.join(rootPath, file);

    const fileRelationships = await analyzeImports(filePath, rootPath);

    relationships.push(...fileRelationships);
  }

  return relationships;
}
