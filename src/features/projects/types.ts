/** @format */

import type { Analysis } from "@/features/analysis/types";
import type { Repository } from "@/features/repositories/types";

export type WorkspaceStatus =
  | "EMPTY"
  | "REPOSITORY_CONNECTED"
  | "ANALYZING"
  | "READY"
  | "FAILED";

export type WorkspaceState = {
  status: WorkspaceStatus;
  repositories: Repository[];
  analyses: Analysis[];
};
