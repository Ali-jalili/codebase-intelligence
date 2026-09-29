/** @format */

import {
  saveAnalysisMetadata,
  saveAnalysisSnapshot,
  updateAnalysisStatus,
} from "@/features/analysis/services";

import { getRepositoryById } from "@/features/repositories/services";

import { detectStack } from "@/lib/analyzer/metadata/detectStack";
import { extractMetadata } from "@/lib/analyzer/metadata/extractMetadata";

import { cloneRepository } from "@/lib/analyzer/repository/clone";
import { findRepositoryRoot } from "@/lib/analyzer/repository/findRepositoryRoot";

import { scanRepository } from "@/lib/analyzer/scanner";
import { cleanupRepository } from "@/lib/analyzer/repository/cleanup";
import { analyzeRepositoryImports } from "@/lib/analyzer/static-analysis/analyzeRepositoryImports";
import { buildKnowledgeGraph } from "@/lib/analyzer/knowledge/buildKnowledgeGraph";

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

      console.log("Repository:", repository.url);

      // 1. Clone
      const workspace = await cloneRepository(
        repository.url,
        path.join(os.tmpdir(), "analyzer", payload.analysisId),
      );
      workspacePath = workspace.path;

      console.log("Workspace created:", workspace.path);

      // 2. Find real project root
      const repositoryRoot = await findRepositoryRoot(workspace.path);

      console.log("Repository root:", repositoryRoot);

      // 3. Scan files/folders
      const snapshot = await scanRepository(repositoryRoot);

      await saveAnalysisSnapshot(payload.analysisId, snapshot);
      console.log("Snapshot saved");

      const relationships = await analyzeRepositoryImports(
        snapshot.files,
        repositoryRoot,
      );

      console.log("Import relationships:", relationships);

      const knowledgeGraph = buildKnowledgeGraph(snapshot.files, relationships);

      console.log("Knowledge graph:", knowledgeGraph);

      // 4. Extract package metadata
      const metadata = await extractMetadata(repositoryRoot);

      console.log("Metadata:", metadata);

      // 5. Detect stack
      const stack = detectStack(metadata);

      console.log("Detected stack:", stack);

      // 6. Save metadata
      await saveAnalysisMetadata(payload.analysisId, {
        ...metadata,
        stack,
      });

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
