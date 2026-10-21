import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { loadEnv } from "vite"
import { defineConfig } from "vitest/config"

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
      outDir: "build",
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "vendor",
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler|wouter)[\\/]/,
              },
              {
                name: "commercelayer",
                test: /[\\/]node_modules[\\/]@commercelayer[\\/]/,
              },
            ],
          },
        },
      },
    },
    resolve: {
      alias: {
        "#components": resolve(import.meta.dirname, "./src/components"),
        "#hooks": resolve(import.meta.dirname, "./src/hooks"),
        "#locales": resolve(import.meta.dirname, "./src/locales"),
        "#providers": resolve(import.meta.dirname, "./src/providers"),
        "#utils": resolve(import.meta.dirname, "./src/utils"),
        "#pages": resolve(import.meta.dirname, "./src/pages"),
        "#styles": resolve(import.meta.dirname, "./src/styles"),
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
  const plugins = [
    tailwindcss(),
    react(),
    analyzeBundle &&
      visualizer({
        filename: resolve(import.meta.dirname, "./build/stats.html"),
        open: true,
        title: "Bundle Stats",
      }),
  ].filter(Boolean)

  return plugins
}
