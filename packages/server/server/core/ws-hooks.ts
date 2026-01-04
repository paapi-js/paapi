import { defineHooks } from 'crossws'

export const wsHooks = defineHooks({
    open(peer) {
        console.log(`[WS] Client connected : ${peer.id}`)
        peer.subscribe('room-global')
    },

    message(peer, message) {
        const text = message.text()
        console.log(`[WS] Message received : ${text}`)
        peer.publish('room-global', text)
    },

    close(peer) {
        console.log(`[WS] Client left : ${peer.id}`)
    },
})
