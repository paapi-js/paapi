import {Controller} from '@hotwired/stimulus';
import paapi from '../lib/main';

export default class DemoController extends Controller {
    static targets = ['pairInput',
        'pairButton',
        'waiting',
        'paired',
        'messageInput',
        'messageOutput',
    ]
    private link = paapi('http://localhost:1616')

    connect() {
        super.connect();
        this.link.onPair(() => this.onPair())
        this.link.on('message', message => this.onMessage(message))
    }

    onPair() {
        this.pairButton.innerText = 'Paired !'
        // @ts-ignore
        this.waitingTarget.classList.add('hidden')
        // @ts-ignore
        this.pairedTarget.classList.remove('hidden')
    }

    onMessage (message: string) {
        this.messageOutput.innerText = message
    }

    async pair(e: Event) {
        e.preventDefault()
        this.pairButton.disabled = true
        this.pairInput.disabled = true
        const {id} = await this.link.pair(this.pairInput.value)
        this.pairInput.value = id
        this.pairButton.innerText = 'Waiting for peer to connect...'
        // @ts-ignore
        this.waitingTarget.classList.remove('hidden')
    }

    async copyId(e) {
        await navigator.clipboard.writeText(this.pairId)
        const initialText = e.target.innerText
        e.target.innerText = "Copied !"
        e.target.disabled = true
        setTimeout(() => {
            e.target.innerText = initialText
            e.target.disabled = false
        }, 3000)
    }

    send(e) {
        e.preventDefault()
        this.link.emit('message', this.messageInput.value)
        this.messageInput.value = ''
    }

    get pairInput() {
        // @ts-ignore
        return this.pairInputTarget
    }

    get messageInput() {
        // @ts-ignore
        return this.messageInputTarget
    }
    get messageOutput() {
        // @ts-ignore
        return this.messageOutputTarget
    }

    get pairId() {
        return this.link.id
    }

    get pairButton() {
        // @ts-ignore
        return this.pairButtonTarget
    }
}
