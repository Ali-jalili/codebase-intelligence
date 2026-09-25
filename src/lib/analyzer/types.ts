/** @format */

export type RepositorySnapshot = {
  files: string[];

  folders: string[];

  dependencies: Record<string, string>;

  configs: string[];
};
