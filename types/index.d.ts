import { IAnyFunction, IAnyObject } from './types/index';
export declare class Event<T extends IAnyObject<IAnyFunction> = {}> {
    /** 事件管理器 */
    private handers;
    /** 预触发事件 */
    private preEmitedEvents;
    constructor();
    /** 缓存未监听的事件 */
    private cacheEvent;
    /** 获取指定未监听的事件 */
    private getCacheEvent;
    /** 内部事件监听函数 */
    private listen;
    /**
     * 监听事件
     * @param eventName - 事件名称
     * @param fn - 触发事件时要执行的函数
     */
    on<K extends keyof T>(eventName: K, fn: T[K]): void;
    /**
     * 监听事件 - 事件只会触发一次
     * @param eventName - 事件名称
     * @param fn - 触发事件时要执行的函数
     */
    once<K extends keyof T>(eventName: K, fn: T[K]): void;
    /**
     * 分发指定事件，会处理会监听的事件
     * @param eventName - 事件名称
     * @param args - 事件需要的参数
     */
    emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): void;
    /**
     * 移除指定事件
     * @param eventName  - 事件名称
     * @param fn  - 事件需要的参数
     */
    remove<K extends keyof T>(eventName: K, fn: T[K]): void;
    /**
     * 移除所有事件监听，释放内存
     */
    clean(): void;
}
declare const _default: Event<{}>;
export default _default;
