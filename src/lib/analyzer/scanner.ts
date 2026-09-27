/** @format */

import fs from "node:fs/promises";
import path from "node:path";

import type { RepositorySnapshot } from "./types";
import { DEFAULT_IGNORE_DIRS } from "./ignore";

async function scanDirectory(
  directoryPath: string,
  rootPath: string,
  files: string[],
  folders: string[],
) {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory() && DEFAULT_IGNORE_DIRS.includes(entry.name)) {
      continue;
    }

    const relativePath = path.relative(rootPath, fullPath);

    if (entry.isDirectory()) {
      folders.push(relativePath);

      await scanDirectory(fullPath, rootPath, files, folders);
    }

    if (entry.isFile()) {
      files.push(relativePath);
    }
  }
}

export async function scanRepository(
  workspacePath: string,
): Promise<RepositorySnapshot> {
  const files: string[] = [];
  const folders: string[] = [];

  await scanDirectory(workspacePath, workspacePath, files, folders);

  return {
    files,
    folders,
    configs: [],
    dependencies: {},
  };
}
