import type { Peer } from 'crossws'
import { defineHooks } from 'crossws'

export const wsHooks = defineHooks({
    open(peer) {
        const room = getPeerRoom(peer)
        if (!room) {
            return
        }
        peer.subscribe(room)
    },

    message(peer, message) {
        const room = getPeerRoom(peer)
        if (!room) {
            return
        }
        const text = message.text()
        peer.publish(room, text)
    },

    close(peer) {
        const room = getPeerRoom(peer)
        if (room) {
            peer.unsubscribe(room)
        }
    },
})

function getPeerRoom(peer: Peer) {
    if (!peer.namespace.startsWith('/room/')) {
        peer.close(4016, 'Invalid paapi namespace')
        return false
    }
    const name = peer.namespace.replace('/room/', '')
    return `paapi-${name}`
}
