import crossws from 'crossws/adapters/cloudflare'
import { wsHooks } from '@/core/ws/hooks'

export const cloudflareWS = crossws({
    bindingName: 'DO_PAAPI',
    // instanceName: "crossws",
    hooks: wsHooks,
})
