/** @format */

import { updateAnalysisStatus } from "@/features/analysis/services";
import { task } from "@trigger.dev/sdk";

export const analyzeRepositoryTask = task({
  id: "analyze-repository",

  run: async (payload: { analysisId: string; repositoryId: string }) => {
    try {
      await updateAnalysisStatus(payload.analysisId, "processing");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await updateAnalysisStatus(payload.analysisId, "completed");

      return {
        success: true,
      };
    } catch (error) {
      await updateAnalysisStatus(payload.analysisId, "failed");

      throw error;
    }
  },
});
