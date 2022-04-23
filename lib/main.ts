import {io} from 'socket.io-client';
import Link from './Link';

export default function paapi (server: string = 'https://paapi.pnk.network/'): Link {
    return new Link(io(server))
}
