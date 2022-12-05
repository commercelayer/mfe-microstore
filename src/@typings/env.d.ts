interface ImportMeta {
  env: ImportMetaEnv & {
    PUBLIC_BASE_PATH?: string
    PUBLIC_DOMAIN?: string
    PUBLIC_SLUG?: string
    PUBLIC_HOSTED?: string
    NODE_ENV?: string
  }
}
