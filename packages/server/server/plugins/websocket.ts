import process from 'node:process'
import { defineNitroPlugin } from 'nitropack/runtime'
import { wsHooks } from '../core/ws-hooks'

export default defineNitroPlugin((nitroApp) => {
    // On vérifie si on est en mode "Runtime Cloudflare"
    // Si env.DO_PAAPI existe, c'est qu'on est sur Cloudflare, donc on ne fait rien ici
    // (c'est la route /api/join qui s'en chargera via le DO)
    if (process.env.DO_PAAPI || (globalThis as any).WebSocketPair) {
        return
    }

    // SINON : On est sur Node.js / Docker / Dev local standard
    console.log('🔌 Mode Node.js détecté : Activation des WebSockets en mémoire')

    // On injecte les hooks directement dans le moteur de Nitro
    nitroApp.hooks.hook('crossws:hooks', () => wsHooks)
})
