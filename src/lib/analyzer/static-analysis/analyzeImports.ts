/** @format */

import fs from "node:fs/promises";
import path from "node:path";

import { extractImports } from "./extractImports";
import { resolveImport } from "./resolveImport";
import type { ImportRelationship } from "./types";

export async function analyzeImports(
  filePath: string,
  rootPath: string,
): Promise<ImportRelationship[]> {
  const sourceCode = await fs.readFile(filePath, "utf-8");

  const imports = extractImports(sourceCode, filePath);

  const relationships: ImportRelationship[] = [];

  for (const importStatement of imports) {
    const targetPath = await resolveImport(importStatement.source, filePath);

    if (!targetPath) {
      continue;
    }

    relationships.push({
      source: path.relative(rootPath, filePath),
      target: path.relative(rootPath, targetPath),
    });
  }

  return relationships;
}
