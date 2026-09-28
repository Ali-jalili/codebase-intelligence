/** @format */

import fs from "node:fs/promises";
import path from "node:path";

const IGNORE_DIRS = ["node_modules", ".git", ".next", "dist", "build"];

async function hasProjectMarker(directoryPath: string): Promise<boolean> {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });

  const names = entries.map((entry) => entry.name);

  return (
    names.includes("package.json") ||
    names.includes("vite.config.js") ||
    names.includes("vite.config.ts") ||
    names.includes("next.config.js") ||
    names.includes("next.config.ts") ||
    names.includes("tsconfig.json")
  );
}

export async function findRepositoryRoot(
  workspacePath: string,
): Promise<string> {
  const isRootProject = await hasProjectMarker(workspacePath);

  if (isRootProject) {
    return workspacePath;
  }

  const entries = await fs.readdir(workspacePath, {
    withFileTypes: true,
  });

  const directories = entries.filter(
    (entry) => entry.isDirectory() && !IGNORE_DIRS.includes(entry.name),
  );

  for (const directory of directories) {
    const candidate = path.join(workspacePath, directory.name);

    const foundRoot = await findRepositoryRoot(candidate);

    if (foundRoot !== candidate) {
      return foundRoot;
    }

    const candidateIsProject = await hasProjectMarker(candidate);

    if (candidateIsProject) {
      return candidate;
    }
  }

  return workspacePath;
}
