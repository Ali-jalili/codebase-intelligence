/** @format */

"use server";

import { analyzeRepositoryTask } from "@/trigger-old/analyze-repository";
import { createAnalysis } from "./services";

export async function createAnalysisAction(repositoryId: string) {
  const analysis = await createAnalysis(repositoryId);
  await analyzeRepositoryTask.trigger({
    analysisId: analysis.id,
    repositoryId,
  });
  return analysis;
}
