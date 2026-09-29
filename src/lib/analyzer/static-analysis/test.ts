/** @format */

import path from "node:path";
import { extractImports } from "./extractImports";
import { resolveImport } from "./resolveImport";

async function main() {
  const sourceFilePath = path.resolve("src/test-workspace/src/App.tsx");

  const sourceCode = `
    import Header from "./components/Header";
    import Button from "./components/Button";
    import { useState } from "react";
  `;

  const imports = extractImports(sourceCode, sourceFilePath);

  console.log("Imports:", imports);

  for (const importStatement of imports) {
    const resolvedPath = await resolveImport(
      importStatement.source,
      sourceFilePath,
    );

    console.log(importStatement.source, "→", resolvedPath);
  }
}

main();
