import { serve } from 'crossws/server'
import { wsHooks } from '@/core/ws/hooks'

serve({
    websocket: wsHooks,
    port: 1616,
    fetch: () =>
        fetch(
            'https://raw.githubusercontent.com/h3js/crossws/refs/heads/main/playground/public/index.html',
        ).then(
            res =>
                new Response(res.body, { headers: { 'Content-Type': 'text/html' } }),
        ),
})
