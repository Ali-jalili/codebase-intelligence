/** @format */

import { simpleGit } from "simple-git";
import fs from "node:fs/promises";
import path from "node:path";

import type { RepositoryWorkspace } from "./types";

export async function cloneRepository(
  repositoryUrl: string,
  workspacePath: string,
): Promise<RepositoryWorkspace> {
  await fs.mkdir(workspacePath, {
    recursive: true,
  });

  const git = simpleGit();

  await git.clone(repositoryUrl, workspacePath);

  return {
    path: path.resolve(workspacePath),
  };
}
