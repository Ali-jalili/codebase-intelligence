/** @format */

import fs from "node:fs/promises";
import path from "node:path";

export type RepositoryMetadata = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
};

export async function extractMetadata(
  workspacePath: string,
): Promise<RepositoryMetadata> {
  const packageJsonPath = path.join(workspacePath, "package.json");

  try {
    const packageJsonFile = await fs.readFile(packageJsonPath, "utf-8");

    const packageJson = JSON.parse(packageJsonFile);

    return {
      dependencies: packageJson.dependencies ?? {},
      devDependencies: packageJson.devDependencies ?? {},
      scripts: packageJson.scripts ?? {},
    };
  } catch {
    return {
      dependencies: {},
      devDependencies: {},
      scripts: {},
    };
  }
}
