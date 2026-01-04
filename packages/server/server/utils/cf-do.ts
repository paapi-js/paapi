import { DurableObject } from 'cloudflare:workers'
import crossws from 'crossws/adapters/cloudflare'
import { wsHooks } from '../core/ws-hooks'

const adapter = crossws({
    bindingName: 'DO_PAAPI',
    hooks: wsHooks,
})

export class PaapiDO extends DurableObject {
    constructor(state: DurableObjectState, env: any) {
        super(state, env)
        adapter.handleDurableInit(this, state, env)
    }

    fetch(request: Request) {
        return adapter.handleDurableUpgrade(this, request)
    }

    webSocketMessage(client: WebSocket, message: ArrayBuffer | string) {
        return adapter.handleDurableMessage(this, client, message)
    }

    webSocketPublish(topic: string, message: ArrayBuffer | string, opts?: any) {
        return adapter.handleDurablePublish(this, topic, message, opts)
    }

    webSocketClose(client: WebSocket, code: number, reason: string, wasClean: boolean) {
        return adapter.handleDurableClose(this, client, code, reason, wasClean)
    }
}
