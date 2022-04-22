import './style.css'
import paapi from '../lib/main';

const app = document.querySelector<HTMLDivElement>('#app')

// @ts-ignore
const setupPairing = async () => {
    const  link = await paapi('http://localhost:1616', 'test')
    link.onPair(() => {
        console.log('PAIRED')
    })
}
setupPairing()
