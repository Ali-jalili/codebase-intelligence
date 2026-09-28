/** @format */

import fs from "node:fs/promises";
import path from "node:path";

const IGNORE_DIRS = ["node_modules", ".git", ".next", "dist", "build"];

export async function findPackageJson(
  rootPath: string,
): Promise<string | null> {
  const entries = await fs.readdir(rootPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name);

    if (entry.isDirectory() && !IGNORE_DIRS.includes(entry.name)) {
      const nestedPackage = await findPackageJson(fullPath);

      if (nestedPackage) {
        return nestedPackage;
      }
    }

    if (entry.isFile() && entry.name === "package.json") {
      return fullPath;
    }
  }

  return null;
}
