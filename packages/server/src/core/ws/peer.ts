import type { Peer } from 'crossws'

export function getPeerRoom(peer: Peer) {
    if (!peer.namespace.startsWith('/room/')) {
        peer.close(4016, 'Invalid paapi namespace')
        return false
    }
    const name = peer.namespace.replace('/room/', '')
    return `paapi-${name}`
}

export function getPeersInSameNS(peer: Peer) {
    const peersInNS = Array.from(peer.peers.values()).filter(p => p.namespace === peer.namespace)
    return peersInNS
}
