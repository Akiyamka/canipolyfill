interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly WORKER_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
