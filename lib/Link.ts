import {Socket} from 'socket.io-client';

export default class Link {
    public id: string|null = null;
    public socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket
    }

    public waitFor(event: string): any {
        return new Promise(resolve => {
            this.socket.once(event, data => {
                resolve(data)
            })
        })
    }
}
