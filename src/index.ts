import { IAnyFunction, IAnyObject, Handlers, PreEmitedEvents } from './types/index'

export class Event<T extends IAnyObject<IAnyFunction> = {}> {
    /** 事件管理器 */
    private handers: Handlers<T>

    /** 预触发事件 */
    private preEmitedEvents: PreEmitedEvents<T>
    
    constructor () {
        this.handers = {}
        this.preEmitedEvents = {}
    }

    /** 缓存未监听的事件 */
    private cacheEvent<K extends keyof T> (eventName: K, ...args: Parameters<T[K]>) {
        if (!this.preEmitedEvents[eventName]) this.preEmitedEvents[eventName] = []
        this.preEmitedEvents[eventName]?.push(args)
    }

    /** 获取指定未监听的事件 */
    private getCacheEvent<K extends keyof T> (eventName: K) {
        let result: Parameters<T[K]>[] = []
        const eventArgs = this.preEmitedEvents[eventName] ?? []
        if (eventArgs && Array.isArray(eventArgs)) {
            result = [...eventArgs]
            eventArgs.length = 0
        }
        return result
    }

    /** 内部事件监听函数 */
    private listen<K extends keyof T> (eventName: K, fn: T[K], isOnce = false) {
        const preEvents = this.getCacheEvent(eventName)
        if (!this.handers[eventName]) this.handers[eventName] = []
        if (preEvents.length) {
            for (const args of preEvents) {
                isFunction(fn) && fn(eventName, ...args)
                !isOnce && (
                    this.handers[eventName]?.push({
                        fn,
                        isOnce: !!isOnce
                    })
                )
            }
        } else {
            this.handers[eventName]?.push({
                fn,
                isOnce: !!isOnce
            })
        }
    }

    /**
     * 监听事件
     * @param eventName - 事件名称
     * @param fn - 触发事件时要执行的函数
     */
    on<K extends keyof T> (eventName: K, fn: T[K]) {
        this.listen(eventName, fn, false)
    }

    /**
     * 监听事件 - 事件只会触发一次
     * @param eventName - 事件名称
     * @param fn - 触发事件时要执行的函数
     */
    once<K extends keyof T> (eventName: K, fn: T[K]) {
        this.listen(eventName, fn, true)
    }

    /**
     * 分发指定事件，会处理会监听的事件
     * @param eventName - 事件名称
     * @param args - 事件需要的参数
     */
    emit<K extends keyof T> (eventName: K, ...args: Parameters<T[K]>) {
        const events = this.handers[eventName]
        if (!events) {
            this.cacheEvent(eventName, ...args)
        } else {
            for (let len = events.length, i = len - 1; i >= 0; i--) {
                const { fn, isOnce } = events[i]
                isFunction(fn) && fn(...args)
                isOnce && events.splice(i, 1)
            }
        }
    }

    /**
     * 移除指定事件
     * @param eventName  - 事件名称
     * @param fn  - 事件需要的参数
     */
    remove<K extends keyof T> (eventName: K, fn: T[K]) {
        const events = this.handers[eventName]
        if (!events) return
        if (!fn) {
            events.length = 0
            return
        }
        for (let len = events.length, i = len - 1; i >= 0; i--) {
            const event = events[i]
            if (event.fn !== fn) continue
            events.splice(i, 1)
            break
        }
    }

    /**
     * 移除所有事件监听，释放内存
     */
    clean () {
        for (const eventName in this.handers) {
            const event = this.handers[eventName]
            event && (event.length = 0)
        }
        this.handers = {}

        for (const preEventName in this.preEmitedEvents) {
            const preEvent = this.preEmitedEvents[preEventName]
            preEvent && preEvent.length
        }
        this.preEmitedEvents = {}
    }
}

/** 验证是否是一个函数 */
function isFunction (fn: IAnyFunction) {
    return typeof fn === 'function'
}

export default new Event()