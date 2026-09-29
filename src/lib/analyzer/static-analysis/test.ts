/** @format */

import path from "node:path";

import { analyzeRepositoryImports } from "./analyzeRepositoryImports";

async function main() {
  const rootPath = path.resolve("src/test-workspace");

  const files = [
    "src/App.tsx",
    "src/components/Header.tsx",
    "src/components/Button.tsx",
  ];

  const relationships = await analyzeRepositoryImports(files, rootPath);

  console.log("Relationships:", relationships);
}

main();
