import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { loadEnv, PluginOption } from "vite"
import { defineConfig } from "vitest/config"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const analyzeBundle = env.ANALYZE_BUNDLE === "true"
  const basePath =
    env.PUBLIC_PROJECT_PATH != null ? `/${env.PUBLIC_PROJECT_PATH}` : ""

  return {
    plugins: preparePlugins({ analyzeBundle }),
    envPrefix: "PUBLIC_",
    server: {
      port: 3000,
    },
    base: `${basePath}/`,
    build: {
      target: "esnext",
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "wouter"],
            commercelayer: [
              "@commercelayer/sdk",
              "@commercelayer/react-components",
            ],
          },
        },
      },
    },
    resolve: {
      alias: {
        "#components": resolve(__dirname, "./src/components"),
        "#hooks": resolve(__dirname, "./src/hooks"),
        "#providers": resolve(__dirname, "./src/providers"),
        "#utils": resolve(__dirname, "./src/utils"),
        "#pages": resolve(__dirname, "./src/pages"),
        "#styles": resolve(__dirname, "./src/styles"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
  }
})

function preparePlugins({ analyzeBundle }: { analyzeBundle: boolean }) {
  const plugins: PluginOption[] = [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
    analyzeBundle &&
      visualizer({
        filename: resolve(__dirname, "./build/stats.html"),
        open: true,
        title: "Bundle Stats",
      }),
  ].filter(Boolean)

  return plugins
}
