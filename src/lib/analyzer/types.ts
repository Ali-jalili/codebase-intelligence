/** @format */

export type RepositorySnapshot = {
  files: string[];

  folders: string[];

  dependencies: Record<string, string>;

  configs: string[];
};

export type RepositoryMetadata = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
};

export type ProjectStack = {
  framework: string | null;
  language: string | null;
  bundler: string | null;
};
