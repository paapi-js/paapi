import { cloudflareWS } from './crossws'

export default {
    async fetch(request, env, context) {
        if (request.headers.get('upgrade') === 'websocket') {
            return cloudflareWS.handleUpgrade(request, env, context)
        }
        return new Response(
            `<script>new WebSocket("ws://localhost:3000").addEventListener("open", (e) => e.target.send("Hello from client!"));</script>`,
            { headers: { 'content-type': 'text/html' } },
        )
    },
} satisfies ExportedHandler<Env>

export { PaapiDO } from './do'
