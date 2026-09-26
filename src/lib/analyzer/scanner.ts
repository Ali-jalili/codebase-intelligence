/** @format */

import fs from "node:fs/promises";

import type { RepositorySnapshot } from "./types";

export async function scanRepository(
  workspacePath: string,
): Promise<RepositorySnapshot> {
  const entries = await fs.readdir(workspacePath, {
    withFileTypes: true,
  });

  const files: string[] = [];
  const folders: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      folders.push(entry.name);
    }

    if (entry.isFile()) {
      files.push(entry.name);
    }
  }

  return {
    files,
    folders,
    configs: [],
    dependencies: {},
  };
}
