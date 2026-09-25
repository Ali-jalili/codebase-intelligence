/** @format */

import { task } from "@trigger.dev/sdk";

export const analyzeRepositoryTask = task({
  id: "analyze-repository",

  run: async (payload: { analysisId: string; repositoryId: string }) => {
    console.log("Starting analysis", payload);

    return {
      success: true,
    };
  },
});
