/** @format */

import fs from "node:fs/promises";

export async function cleanupRepository(workspacePath: string) {
  await fs.rm(workspacePath, {
    recursive: true,
    force: true,
  });
}
