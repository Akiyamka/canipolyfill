import type { WorkderDTO } from "./types";

const isWorkerDTO = (data: unknown): data is WorkderDTO =>
  data !== null && typeof data === "object" && "polyfills" in data;
export async function getModulesByQuery(targetsQuery: string) {
  const url = `${import.meta.env.VITE_WORKER_ENDPOINT}/?targets=${encodeURIComponent(targetsQuery)}`;
  const response = await fetch(url);
  const payload = (await response.json()) as WorkderDTO;
  if (isWorkerDTO(payload)) return payload;
  throw Error(payload.error)
}
