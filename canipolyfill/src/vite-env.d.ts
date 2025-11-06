interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_WORKER_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
