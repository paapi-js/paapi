import { DurableObject } from 'cloudflare:workers'
import { cloudflareWS } from './crossws'

export class PaapiDO extends DurableObject {
    constructor(state: DurableObjectState, env: any) {
        super(state, env)
        cloudflareWS.handleDurableInit(this, state, env)
    }

    fetch(request: Request) {
        return cloudflareWS.handleDurableUpgrade(this, request)
    }

    webSocketMessage(client: WebSocket, message: ArrayBuffer | string) {
        return cloudflareWS.handleDurableMessage(this, client, message)
    }

    webSocketPublish(topic: string, message: ArrayBuffer | string, opts?: any) {
        return cloudflareWS.handleDurablePublish(this, topic, message, opts)
    }

    webSocketClose(client: WebSocket, code: number, reason: string, wasClean: boolean) {
        return cloudflareWS.handleDurableClose(this, client, code, reason, wasClean)
    }
}
