/** @format */

import ts from "typescript";

import type { ImportStatement } from "./types";

export function extractImports(
  sourceCode: string,
  filePath: string,
): ImportStatement[] {
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true,
  );

  const imports: ImportStatement[] = [];

  sourceFile.forEachChild((node) => {
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier;

      if (ts.isStringLiteral(moduleSpecifier)) {
        imports.push({
          source: moduleSpecifier.text,
        });
      }
    }
  });

  return imports;
}
