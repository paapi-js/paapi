export default function useListener() {
    const listeners: Array<Function> = []
    const bind = (listener: Function) => {
        listeners.push(listener)
    }
    const trigger = (data: any) => {
        listeners.forEach(l => {
            if (typeof l === 'function') {
                l(data)
            }
        })
    }
    return {
        bind,
        trigger
    }
}
