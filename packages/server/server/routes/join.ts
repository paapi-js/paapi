import { defineEventHandler, toWebRequest } from 'h3'

export default defineEventHandler(async (event) => {
    // -----------------------------------------------------------
    // CAS 1 : CLOUDFLARE (Production avec Durable Objects)
    // -----------------------------------------------------------
    if (event.context.cloudflare) {
        const env = event.context.cloudflare.env
        const id = env.DO_PAAPI.idFromName('global')
        const stub = env.DO_PAAPI.get(id)
        return stub.fetch(toWebRequest(event))
    }

    // -----------------------------------------------------------
    // CAS 2 : NODE.JS (Dev Local / Docker / VPS)
    // -----------------------------------------------------------
    // Sur Node, Nitro (via crossws) gère l'upgrade automatiquement
    // si la requête arrive sur une route, MAIS il faut que la route
    // ne retourne rien pour laisser le hook 'crossws' prendre le relais,
    // ou on peut expliciter l'upgrade si besoin.

    // Le plus simple avec la config moderne :
    // Si on est là, c'est que le plugin (Etape 2) a chargé les hooks.
    // On laisse la requête passer, le serveur sous-jacent va gérer l'upgrade.

    if (event.node?.req?.headers.upgrade === 'websocket') {
        // Sur Node, on ne fait rien de spécial, le plugin a déjà
        // hooké le serveur. On laisse faire.
        return
    }

    return 'Mode Node.js : Utilisez un client WebSocket pour vous connecter.'
})
