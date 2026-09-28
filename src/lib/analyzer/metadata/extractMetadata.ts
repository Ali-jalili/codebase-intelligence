/** @format */

import fs from "node:fs/promises";

import { findPackageJson } from "./findPackageJson";
import { RepositoryMetadata } from "../types";

export async function extractMetadata(
  workspacePath: string,
): Promise<RepositoryMetadata> {
  const packageJsonPath = await findPackageJson(workspacePath);

  if (!packageJsonPath) {
    return {
      dependencies: {},
      devDependencies: {},
      scripts: {},
    };
  }

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
