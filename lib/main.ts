import {io} from 'socket.io-client';
import Link from './Link';
import useListener from './useListener';

export default async function paapi (server: string = 'https://paapi.pnk.network/') {

    const { bind: onPair, trigger: triggerPair } = useListener()

    const connect = (): Promise<Link> => {
        const link: Link = new Link(io(server))
        return new Promise(resolve => {
            link.socket.on('connect', () => {
                resolve(link)
                link.socket.off('connect')
            });
        })
    }
    const link: Link = await connect()
    link.socket.on('paapi:paired', triggerPair)

    async function join (id: string|null): Promise<string> {
        link.socket.emit('paapi:join', id)
        id = await link.waitFor('paapi:joined') as string
        link.id = id
        return id
    }

    return {
        link,
        join,
        onPair
    }
}
