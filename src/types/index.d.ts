export type IAnyObject<T = any> = Record<string, T>

export type IAnyFunction<T = any> = (...args: any[]) => T

export type Handlers<T extends IAnyObject> = {
    [K in keyof T]?: Array<{
        fn: T[K]
        isOnce: boolean
    }>
}

export type PreEmitedEvents<T extends IAnyObject> = {
    [K in keyof T]?: Array<Parameters<T[K]>>
}