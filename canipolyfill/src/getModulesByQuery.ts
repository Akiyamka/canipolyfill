import type { WorkderDTO } from "./types";

export async function getModulesByQuery(targetsQuery: string) {
  const url = `https://your-worker.workers.dev/?targets=${encodeURIComponent(targetsQuery)}`;
  const response = await fetch(url);
  return await response.json() as WorkderDTO
}
