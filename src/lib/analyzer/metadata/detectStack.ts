/** @format */

import { ProjectStack, RepositoryMetadata } from "../types";

export function detectStack(metadata: RepositoryMetadata): ProjectStack {
  const allDependencies = {
    ...metadata.dependencies,
    ...metadata.devDependencies,
  };

  let framework: string | null = null;
  let language: string | null = null;
  let bundler: string | null = null;

  // Framework detection
  if ("next" in allDependencies) {
    framework = "Next.js";
  } else if ("react" in allDependencies) {
    framework = "React";
  } else if ("vue" in allDependencies) {
    framework = "Vue";
  } else if ("@angular/core" in allDependencies) {
    framework = "Angular";
  }

  // Language detection
  if ("typescript" in allDependencies) {
    language = "TypeScript";
  } else {
    language = "JavaScript";
  }

  // Bundler detection
  if ("vite" in allDependencies) {
    bundler = "Vite";
  } else if ("webpack" in allDependencies) {
    bundler = "Webpack";
  }

  return {
    framework,
    language,
    bundler,
  };
}
