export interface PolyfillsList {
  targets: string,
  polyfills: string[],
  count: number,
}

export interface PolyfillsError {
   error: string
}

export type PolyfillsResponseDto = PolyfillsList | PolyfillsError
