var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Event = /** @class */ (function () {
    function Event() {
        this.handers = {};
        this.preEmitedEvents = {};
    }
    /** 缓存未监听的事件 */
    Event.prototype.cacheEvent = function (eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.preEmitedEvents[eventName])
            this.preEmitedEvents[eventName] = [];
        (_a = this.preEmitedEvents[eventName]) === null || _a === void 0 ? void 0 : _a.push(args);
    };
    /** 获取指定未监听的事件 */
    Event.prototype.getCacheEvent = function (eventName) {
        var _a;
        var result = [];
        var eventArgs = (_a = this.preEmitedEvents[eventName]) !== null && _a !== void 0 ? _a : [];
        if (eventArgs && Array.isArray(eventArgs)) {
            result = __spreadArray([], eventArgs, true);
            eventArgs.length = 0;
        }
        return result;
    };
    /** 内部事件监听函数 */
    Event.prototype.listen = function (eventName, fn, isOnce) {
        var _a, _b;
        if (isOnce === void 0) { isOnce = false; }
        var preEvents = this.getCacheEvent(eventName);
        if (!this.handers[eventName])
            this.handers[eventName] = [];
        if (preEvents.length) {
            for (var _i = 0, preEvents_1 = preEvents; _i < preEvents_1.length; _i++) {
                var args = preEvents_1[_i];
                isFunction(fn) && fn.apply(void 0, __spreadArray([eventName], args, false));
                !isOnce && ((_a = this.handers[eventName]) === null || _a === void 0 ? void 0 : _a.push({
                    fn: fn,
                    isOnce: !!isOnce
                }));
            }
        }
        else {
            (_b = this.handers[eventName]) === null || _b === void 0 ? void 0 : _b.push({
                fn: fn,
                isOnce: !!isOnce
            });
        }
    };
    /**
     * 监听事件
     * @param eventName - 事件名称
     * @param fn - 触发事件时要执行的函数
     */
    Event.prototype.on = function (eventName, fn) {
        this.listen(eventName, fn, false);
    };
    /**
     * 监听事件 - 事件只会触发一次
     * @param eventName - 事件名称
     * @param fn - 触发事件时要执行的函数
     */
    Event.prototype.once = function (eventName, fn) {
        this.listen(eventName, fn, true);
    };
    /**
     * 分发指定事件，会处理会监听的事件
     * @param eventName - 事件名称
     * @param args - 事件需要的参数
     */
    Event.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var events = this.handers[eventName];
        if (!events) {
            this.cacheEvent.apply(this, __spreadArray([eventName], args, false));
        }
        else {
            for (var len = events.length, i = len - 1; i >= 0; i--) {
                var _a = events[i], fn = _a.fn, isOnce = _a.isOnce;
                isFunction(fn) && fn.apply(void 0, args);
                isOnce && events.splice(i, 1);
            }
        }
    };
    /**
     * 移除指定事件
     * @param eventName  - 事件名称
     * @param fn  - 事件需要的参数
     */
    Event.prototype.remove = function (eventName, fn) {
        var events = this.handers[eventName];
        if (!events)
            return;
        if (!fn) {
            events.length = 0;
            return;
        }
        for (var len = events.length, i = len - 1; i >= 0; i--) {
            var event = events[i];
            if (event.fn !== fn)
                continue;
            events.splice(i, 1);
            break;
        }
    };
    /**
     * 移除所有事件监听，释放内存
     */
    Event.prototype.clean = function () {
        for (var eventName in this.handers) {
            var event = this.handers[eventName];
            event && (event.length = 0);
        }
        this.handers = {};
        for (var preEventName in this.preEmitedEvents) {
            var preEvent = this.preEmitedEvents[preEventName];
            preEvent && preEvent.length;
        }
        this.preEmitedEvents = {};
    };
    return Event;
}());
export { Event };
/** 验证是否是一个函数 */
function isFunction(fn) {
    return typeof fn === 'function';
}
export default new Event();
//# sourceMappingURL=index.js.map