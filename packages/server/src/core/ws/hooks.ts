import { defineHooks } from 'crossws'
import { getPeerRoom, getPeersInSameNS } from './peer'

export const wsHooks = defineHooks({
    open(peer) {
        const room = getPeerRoom(peer)
        if (!room) {
            return
        }
        peer.subscribe(room)
        const peersInNS = getPeersInSameNS(peer)
        console.log('peers in same ns:', peersInNS.length)
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
            try {
                peer.unsubscribe(room)
            }
            catch {}
        }
        peer.close(1000)
    },
})
