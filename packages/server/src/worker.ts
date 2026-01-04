import { DurableObject } from 'cloudflare:workers'
import crossws from 'crossws/adapters/cloudflare'
import { wsHooks } from './ws/hooks'

const ws = crossws({
    bindingName: 'DO_PAAPI',
    // instanceName: "crossws",
    hooks: wsHooks,
})

export default {
    async fetch(request, env, context) {
        if (request.headers.get('upgrade') === 'websocket') {
            return ws.handleUpgrade(request, env, context)
        }
        return new Response(
            `<script>new WebSocket("ws://localhost:3000").addEventListener("open", (e) => e.target.send("Hello from client!"));</script>`,
            { headers: { 'content-type': 'text/html' } },
        )
    },
} satisfies ExportedHandler<Env>

export class PaapiDO extends DurableObject {
    constructor(state: DurableObjectState, env: any) {
        super(state, env)
        ws.handleDurableInit(this, state, env)
    }

    fetch(request: Request) {
        return ws.handleDurableUpgrade(this, request)
    }

    webSocketMessage(client: WebSocket, message: ArrayBuffer | string) {
        return ws.handleDurableMessage(this, client, message)
    }

    webSocketPublish(topic: string, message: ArrayBuffer | string, opts?: any) {
        return ws.handleDurablePublish(this, topic, message, opts)
    }

    webSocketClose(client: WebSocket, code: number, reason: string, wasClean: boolean) {
        return ws.handleDurableClose(this, client, code, reason, wasClean)
    }
}
