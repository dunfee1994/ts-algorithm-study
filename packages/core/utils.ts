const _objectToString = Object.prototype.toString
const _funcToString = Function.prototype.toString

export function isObjectLike(obj: any): boolean {
    return obj !== null && typeof obj === 'object'
}

export function isDef<T>(v: T): v is NonNullable<T> {
    return v !== undefined && v !== null
}

/**
 * @description 判断 obj 的数据类型是否为 function
 *
 * @param {*} obj
 *
 * @returns {boolean} obj 的数据类型为 function 则返回 true，否则返回 false
 */
export function isFunction(obj: any): boolean {
    return _objectToString.call(obj) === '[object Function]'
}

/**
 * @description 判断 obj 的数据类型是否为 async function
 *
 * @param {*} obj
 *
 * @returns {boolean} obj 的数据类型为 async function 则返回 true，否则返回 false
 */
export function isAsyncFunction(obj: any): boolean {
    return _objectToString.call(obj) === '[object AsyncFunction]'
}

/**
 * @description 判断 obj 的数据类型是否为 array
 *
 * @param {*} obj
 *
 * @returns {boolean} obj 的数据类型为 array 则返回 true，否则返回 false
 */
export function isArray(obj: any): boolean {
    if (Array.isArray) return Array.isArray(obj)
    return _objectToString.call(obj) === '[object Array]'
}

/**
 * @description 判断 obj 的数据类型是否为 integer
 *
 * @param {*} obj
 *
 * @returns {boolean} obj 的数据类型为 integer 则返回 true，否则返回 false
 */
export function isInteger(obj: any): boolean {
    if (Number.isInteger) return Number.isInteger(obj)
    return typeof obj === 'number' && isFinite(obj) && Math.floor(obj) === obj
}

/**
 * @description 判断 obj 的数据类型是否为 Iterable
 *
 * @param {*} obj
 *
 * @returns {boolean} obj 的数据类型为 Iterable 则返回 true，否则返回 false
 */
export function isIterable(obj: any): obj is Iterable<any> {
    return isObjectLike(obj) && typeof obj[Symbol.iterator] === 'function'
}

/**
 * @description 判断 property 是否为对象 obj 的自有属性
 *
 * @param {object} obj 对象
 * @param {string} property 属性名
 *
 * @returns {boolean} property 为对象 obj 的自有属性 则返回 true，否则返回 false
 */
export function hasOwnProperty(obj: object, property: string): boolean {
    if (obj === null) return false
    return Object.prototype.hasOwnProperty.call(obj, property)
}

/**
 * @description 判断 obj 的数据类型是否为 object（普通对象）
 *
 * @param {*} obj
 *
 * @returns {boolean} obj 的数据类型为 object（普通对象） 则返回 true，否则返回 false
 */
export function isPlainObject(obj: any): boolean {
    if (!isObjectLike(obj)) return false
    if (_objectToString.call(obj) !== '[object Object]') return false

    const _proto = Object.getPrototypeOf(obj)
    if (_proto === null) return true

    const Ctor = hasOwnProperty(_proto, 'constructor') && _proto.constructor
    return (
        isFunction(Ctor) &&
        Ctor instanceof Ctor &&
        _funcToString.call(Ctor) === _funcToString.call(Object)
    )
}
