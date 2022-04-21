import './style.css'
import paapi from '../lib/main';

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
const pairApi = await paapi('http://localhost:1616/')

