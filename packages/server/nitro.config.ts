import process from 'node:process'
import { defineNitroConfig } from 'nitropack/config'

// https://nitro.build/config
export default defineNitroConfig({
    compatibilityDate: 'latest',
    srcDir: 'server',
    // imports: false,

    experimental: {
        tasks: true,
        websocket: true,
    },

    ...(process.env.NITRO_PRESET === 'cloudflare-module' || process.env.NITRO_PRESET === 'cloudflare-pages'
        ? {
            exportConditions: ['workerd', 'worker', 'browser'],
            cloudflare: {
                deployConfig: true,
                nodeCompat: true,
            },
        }
        : {
        }),
})
