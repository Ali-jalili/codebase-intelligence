/** @format */

import fs from "node:fs/promises";
import path from "node:path";

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

export async function resolveImport(
  importPath: string,
  sourceFilePath: string,
): Promise<string | null> {
  if (!importPath.startsWith("./") && !importPath.startsWith("../")) {
    return null;
  }

  const sourceDirectory = path.dirname(sourceFilePath);

  const targetPath = path.resolve(sourceDirectory, importPath);

  for (const extension of EXTENSIONS) {
    const filePath = `${targetPath}${extension}`;

    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      // File with this extension doesn't exist.
    }
  }

  return null;
}
