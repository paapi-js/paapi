import {Socket} from 'socket.io-client';
import useListener from './useListener';

export default class Link {
    public id: string | null = null;
    private _socket: Socket;

    private _pairListener = useListener()

    constructor(socket: Socket) {
        this._socket = socket
        this._socket.on('paapi:paired', this._pairListener.trigger)
    }

    public waitFor(event: string): any {
        return new Promise(resolve => {
            this._socket.once(event, data => {
                resolve(data)
            })
        })
    }

    async pair(id: string | null): Promise<string> {
        this._socket.emit('paapi:join', id)
        this.id = await this.waitFor('paapi:joined') as string
        return this.id
    }

    public onPair(listener: Function) {
        this._pairListener.bind(listener)
    }

    /**
     * ===== Socket io pass through =====
     */
    get socket() {
        return this._socket
    }

    get connected(): boolean {
        return this._socket.connected
    }
    get disconnected(): boolean {
        return this._socket.disconnected
    }
    emit(eventName: string, ...args: any[]): Socket {
        return this._socket.emit(eventName, ...args)
    }
    on(eventName: string, callback: (...args: any[]) => void): Socket {
        return this._socket.on(eventName, callback)
    }
    onAny(callback: (event: string,...args: any[]) => void): Socket {
        return this._socket.onAny(callback)
    }
    once(eventName: string, callback: (...args: any[]) => void): Socket {
        return this._socket.once(eventName, callback)
    }
    listeners(eventName: string): Function[] {
        return this._socket.listeners(eventName)
    }
    off(eventName: string, listener: (...args: any[]) => void): Socket {
        return this._socket.off(eventName, listener)
    }
}
