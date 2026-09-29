/** @format */

import {
  saveAnalysisMetadata,
  saveAnalysisSnapshot,
  updateAnalysisStatus,
} from "@/features/analysis/services";
import { getRepositoryById } from "@/features/repositories/services";
import { detectStack } from "@/lib/analyzer/metadata/detectStack";
import { extractMetadata } from "@/lib/analyzer/metadata/extractMetadata";
import { cleanupRepository } from "@/lib/analyzer/repository/cleanup";
import { cloneRepository } from "@/lib/analyzer/repository/clone";
import { findRepositoryRoot } from "@/lib/analyzer/repository/findRepositoryRoot";
import { buildKnowledgeGraph } from "@/lib/analyzer/knowledge/buildKnowledgeGraph";
import { analyzeRepositoryImports } from "@/lib/analyzer/static-analysis/analyzeRepositoryImports";
import { scanRepository } from "@/lib/analyzer/scanner";
import { task } from "@trigger.dev/sdk";
import os from "node:os";
import path from "node:path";

export const analyzeRepositoryTask = task({
  id: "analyze-repository",

  run: async (payload: { analysisId: string; repositoryId: string }) => {
    let workspacePath: string | null = null;

    try {
      await updateAnalysisStatus(payload.analysisId, "processing");

      const repository = await getRepositoryById(payload.repositoryId);

      // 1. Clone repository
      const workspace = await cloneRepository(
        repository.url,
        path.join(os.tmpdir(), "analyzer", payload.analysisId),
      );

      workspacePath = workspace.path;

      // 2. Find project root
      const repositoryRoot = await findRepositoryRoot(workspace.path);

      // 3. Scan repository
      const snapshot = await scanRepository(repositoryRoot);

      // 4. Analyze imports
      const relationships = await analyzeRepositoryImports(
        snapshot.files,
        repositoryRoot,
      );

      // 5. Build knowledge graph
      const knowledgeGraph = buildKnowledgeGraph(snapshot.files, relationships);

      console.log("SNAPSHOT BEFORE SAVE:", {
        ...snapshot,
        knowledgeGraph,
      });

      // 6. Save analysis snapshot
      await saveAnalysisSnapshot(payload.analysisId, {
        ...snapshot,
        knowledgeGraph,
      });

      console.log("Snapshot saved");

      // 7. Extract package metadata
      const metadata = await extractMetadata(repositoryRoot);

      // 8. Detect technology stack
      const stack = detectStack(metadata);

      // 9. Save metadata
      await saveAnalysisMetadata(payload.analysisId, {
        ...metadata,
        stack,
      });

      // 10. Complete analysis
      await updateAnalysisStatus(payload.analysisId, "completed");

      return {
        success: true,
      };
    } catch (error) {
      await updateAnalysisStatus(payload.analysisId, "failed");

      throw error;
    } finally {
      if (workspacePath) {
        await cleanupRepository(workspacePath);
      }
    }
  },
});
