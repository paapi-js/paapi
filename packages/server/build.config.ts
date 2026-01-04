import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * This unbuild configuration is used to build the node runtime only.
 * Cloudflare runtime is built via wrangler directly.
 */
export default defineBuildConfig({
    entries: [{
        input: 'src/runtimes/node/index',
        name: 'index',
    }],
    outDir: resolve(__dirname, 'dist/node'),
    alias: {
        '@': resolve(__dirname, 'src'),
    },
    clean: true,
    rollup: {
        inlineDependencies: true,
        esbuild: {
            target: 'node24',
        },
    },
})
