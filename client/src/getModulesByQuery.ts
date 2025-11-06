import type { PolyfillsResponseDto, PolyfillsList } from "@canipolyfill/types";

const isWorkerDTO = (data: unknown): data is PolyfillsList =>
  data !== null && typeof data === "object" && "polyfills" in data;

export async function getModulesByQuery(targetsQuery: string) {
  const url = `${import.meta.env.VITE_WORKER_ENDPOINT}/?targets=${encodeURIComponent(targetsQuery)}`;
  const response = await fetch(url);
  const payload = (await response.json()) as PolyfillsResponseDto;
  if (isWorkerDTO(payload)) {
    return payload;
  } else {
    throw Error(payload.error);
  }
}
