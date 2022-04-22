import {io} from 'socket.io-client';
import Link from './Link';

export default async function paapi (server: string = 'https://paapi.pnk.network/', id: string|null): Promise<Link> {

    const link: Link = new Link(io(server))
    await link.waitFor('connect')
    await link.pair(id)
    return link
}
