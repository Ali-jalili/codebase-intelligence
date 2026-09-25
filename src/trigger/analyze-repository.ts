/** @format */

import { updateAnalysisStatus } from "@/features/analysis/services";
import { task } from "@trigger.dev/sdk";

export const analyzeRepositoryTask = task({
  id: "analyze-repository",

  run: async (payload: { analysisId: string; repositoryId: string }) => {
    await updateAnalysisStatus(payload.analysisId, "processing");

    return {
      success: true,
    };
  },
});
