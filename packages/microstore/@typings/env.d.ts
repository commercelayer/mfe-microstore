interface ImportMeta {
  env: ImportMetaEnv & {
    PUBLIC_PROJECT_PATH?: string
    PUBLIC_SELF_HOSTED_SLUG?: string
    DEV: boolean
  }
}
